package tools;

// What the shipped export tells a rider about a route and a trip, per publisher.
//
// OTP takes a route's short name off Line/PublicCode and its long name off Line/Name, and a trip's
// short name off ServiceJourney/PublicCode. This counts those three fields in the artefact, so the
// labelling can be checked on any export without rebuilding one.
//
// A Name equal to the Line's own PublicCode is counted apart from a real one: it is what the Mentz
// exports ship, and it renders as the number printed twice.
//
// A trip's headsign is counted too, and only one place can carry it: the DestinationDisplay the FIRST
// StopPointInJourneyPattern of a pattern references. A display at a later point headsigns the run from
// there on and leaves the trip itself unheadsigned, and a DestinationDisplayView in that slot is read
// by nobody, so neither counts here.
//
// It reads the zip and nothing else, the way the cross-border verifier does: no store, no rebuild.

import toolkit.model.NetexUtils;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamReader;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class VerifyLineLabels {

    /// The entry holding the lines, and the ones holding the journeys.
    private static final String NETWORK = "shared-03-network.xml";
    private static final Pattern JOURNEY_ENTRY = Pattern.compile("g\\d+-\\d+\\.xml");

    /// One publisher's tally.
    private static final class Tally {
        long lines;
        long coded;
        long named;
        long nameIsCode;
        long nameless;
        long journeys;
        long journeysCoded;
        long patterns;
        long patternsHeadsigned;
    }

    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.err.println("VerifyLineLabels <netex-epip-merged.zip>");
            System.exit(2);
        }
        Path zip = Path.of(args[0]);
        if (!Files.exists(zip)) {
            System.err.println(zip + " does not exist -- run 'make netex' first");
            System.exit(1);
        }
        Map<String, Tally> byCodespace = new TreeMap<>();
        readLines(zip, byCodespace);
        readJourneys(zip, byCodespace);
        report(byCodespace);
    }

    private static Tally tally(Map<String, Tally> m, String id, String element) {
        return m.computeIfAbsent(codespaceOf(id, element), k -> new Tally());
    }

    /// The publisher part of an id: everything before the class token, which is the part a feed owns.
    /// `at:obb:Line:010S1W.j26:` answers `at:obb` and `FTG:Line:N177` answers `FTG`.
    ///
    /// The token is NOT necessarily the element's own name. Trenord publishes
    /// `<ServiceJourney id="IT:ITC4:VehicleJourney:TRENORD:55197195">` — the element is the concrete
    /// class and the id names its abstract parent — so matching on the element name left every such
    /// journey its own row. [NetexUtils#codespacePrefix] tests each token against the model registry
    /// instead and finds whichever class name is actually there; the element name is the fallback for
    /// an id whose token names no NeTEx class at all. Counting colons would read `FTG:Line` as a
    /// codespace, a publisher using one participant token having one colon fewer than the Austrians.
    static String codespaceOf(String id, String element) {
        if (id == null || id.isEmpty()) return "(no id)";
        String prefix = NetexUtils.codespacePrefix(id);
        if (prefix != null) {
            return prefix.endsWith(":") ? prefix.substring(0, prefix.length() - 1) : prefix;
        }
        int at = id.indexOf(":" + element + ":");
        return at < 0 ? id : id.substring(0, at);
    }

    /// Count Line and FlexibleLine in the network entry. Only the element's own children are read --
    /// a Line carries no nested Line -- so depth tracking is enough to stay inside one.
    private static void readLines(Path zip, Map<String, Tally> out) throws Exception {
        forEntry(zip, NETWORK, r -> {
            while (r.hasNext()) {
                if (r.next() != XMLStreamConstants.START_ELEMENT) continue;
                String el = r.getLocalName();
                if (!el.equals("Line") && !el.equals("FlexibleLine")) continue;
                String id = r.getAttributeValue(null, "id");
                Map<String, String> fields = childText(r, el,
                        "Name", "ShortName", "PublicCode", "PrivateCode");
                Tally t = tally(out, id, el);
                t.lines++;
                String name = fields.get("Name");
                String code = fields.get("PublicCode");
                if (code != null && !code.isBlank()) t.coded++;
                if (name == null || name.isBlank()) {
                    t.nameless++;
                } else if (name.equals(code) || name.equals(fields.get("ShortName"))) {
                    t.nameIsCode++;
                } else {
                    t.named++;
                }
            }
        });
    }

    /// Count ServiceJourney and TemplateServiceJourney across every numbered group entry, and the
    /// ServiceJourneyPatterns that ride with them.
    private static void readJourneys(Path zip, Map<String, Tally> out) throws Exception {
        forEntries(zip, JOURNEY_ENTRY, (entry, r) -> {
            while (r.hasNext()) {
                if (r.next() != XMLStreamConstants.START_ELEMENT) continue;
                String el = r.getLocalName();
                if (el.equals("ServiceJourneyPattern")) {
                    String id = r.getAttributeValue(null, "id");
                    boolean headsigned = firstPointNamesADisplay(r, el);
                    Tally t = tally(out, id, el);
                    t.patterns++;
                    if (headsigned) t.patternsHeadsigned++;
                    continue;
                }
                if (!el.equals("ServiceJourney") && !el.equals("TemplateServiceJourney")) continue;
                String id = r.getAttributeValue(null, "id");
                Map<String, String> fields = childText(r, el, "PublicCode");
                Tally t = tally(out, id, el);
                t.journeys++;
                String code = fields.get("PublicCode");
                if (code != null && !code.isBlank()) t.journeysCoded++;
            }
        });
    }

    /// Whether the FIRST StopPointInJourneyPattern of the pattern the reader is positioned on
    /// references a DestinationDisplay, read to the pattern's end tag.
    ///
    /// Only the first point is consulted, because only the first point headsigns the trip. First in
    /// document order, which is the running order in every feed the pipeline loads.
    private static boolean firstPointNamesADisplay(XMLStreamReader r, String element)
            throws Exception {
        int depth = 0;
        boolean seenAPoint = false;
        boolean inTheFirstPoint = false;
        boolean named = false;
        while (r.hasNext()) {
            int event = r.next();
            if (event == XMLStreamConstants.START_ELEMENT) {
                depth++;
                String el = r.getLocalName();
                if (el.equals("StopPointInJourneyPattern")) {
                    inTheFirstPoint = !seenAPoint;
                    seenAPoint = true;
                } else if (inTheFirstPoint && el.equals("DestinationDisplayRef")) {
                    named = true;
                }
            } else if (event == XMLStreamConstants.END_ELEMENT) {
                if (depth == 0 && element.equals(r.getLocalName())) return named;
                if (r.getLocalName().equals("StopPointInJourneyPattern")) inTheFirstPoint = false;
                depth--;
            }
        }
        return named;
    }

    /// The text of the named direct children of the element the reader is positioned on, read to its
    /// end tag. A child of a nested element is skipped: only depth 1 inside `element` is collected.
    private static Map<String, String> childText(XMLStreamReader r, String element, String... names)
            throws Exception {
        Map<String, String> out = new LinkedHashMap<>();
        int depth = 0;
        String collecting = null;
        StringBuilder text = new StringBuilder();
        while (r.hasNext()) {
            int event = r.next();
            if (event == XMLStreamConstants.START_ELEMENT) {
                depth++;
                if (depth == 1) {
                    for (String n : names) {
                        if (n.equals(r.getLocalName())) {
                            collecting = n;
                            text.setLength(0);
                            break;
                        }
                    }
                }
            } else if (event == XMLStreamConstants.CHARACTERS && collecting != null) {
                text.append(r.getText());
            } else if (event == XMLStreamConstants.END_ELEMENT) {
                if (depth == 0 && element.equals(r.getLocalName())) return out;
                if (depth == 1 && collecting != null && collecting.equals(r.getLocalName())) {
                    out.putIfAbsent(collecting, text.toString().strip());
                    collecting = null;
                }
                depth--;
            }
        }
        return out;
    }

    private static void report(Map<String, Tally> byCodespace) {
        System.out.printf("%-12s %8s %8s %8s %9s %8s   %10s %8s   %9s %9s%n",
                "codespace", "lines", "coded", "named", "name=code", "no name", "journeys", "coded",
                "patterns", "headsign");
        Tally all = new Tally();
        for (Map.Entry<String, Tally> e : byCodespace.entrySet()) {
            Tally t = e.getValue();
            line(e.getKey(), t);
            all.lines += t.lines;
            all.coded += t.coded;
            all.named += t.named;
            all.nameIsCode += t.nameIsCode;
            all.nameless += t.nameless;
            all.journeys += t.journeys;
            all.journeysCoded += t.journeysCoded;
            all.patterns += t.patterns;
            all.patternsHeadsigned += t.patternsHeadsigned;
        }
        line("TOTAL", all);
        if (all.nameless > 0) {
            System.out.printf("%n%,d lines carry no Name. The profile requires the field, and OTP "
                    + "dereferences it without a null guard.%n", all.nameless);
        }
        long unheadsigned = all.patterns - all.patternsHeadsigned;
        if (unheadsigned > 0) {
            System.out.printf("%n%,d patterns name no display at their first stop point, so every "
                    + "trip on them reaches a consumer with no headsign.%n", unheadsigned);
        }
    }

    private static void line(String codespace, Tally t) {
        System.out.printf("%-12s %8d %8d %8d %9d %8d   %10d %8d   %9d %9d%n", codespace,
                t.lines, t.coded, t.named, t.nameIsCode, t.nameless, t.journeys, t.journeysCoded,
                t.patterns, t.patternsHeadsigned);
    }

    // ---------------------------------------------------------------- zip streaming

    interface Body { void read(XMLStreamReader r) throws Exception; }

    interface NamedBody { void read(String name, XMLStreamReader r) throws Exception; }

    static void forEntry(Path zip, String name, Body body) throws Exception {
        try (ZipInputStream zis = new ZipInputStream(Files.newInputStream(zip))) {
            ZipEntry e;
            while ((e = zis.getNextEntry()) != null) {
                if (!e.getName().equals(name)) continue;
                XMLStreamReader r = factory().createXMLStreamReader(shield(zis));
                body.read(r);
                r.close();
                return;
            }
        }
        throw new IOException("no entry " + name + " in " + zip);
    }

    static int forEntries(Path zip, Pattern name, NamedBody body) throws Exception {
        int matched = 0;
        try (ZipInputStream zis = new ZipInputStream(Files.newInputStream(zip))) {
            ZipEntry e;
            while ((e = zis.getNextEntry()) != null) {
                if (!name.matcher(e.getName()).matches()) continue;
                matched++;
                XMLStreamReader r = factory().createXMLStreamReader(shield(zis));
                body.read(e.getName(), r);
                r.close();
            }
        }
        return matched;
    }

    /// StAX closes the stream it is handed; a ZipInputStream must survive its entry.
    static InputStream shield(InputStream in) {
        return new java.io.FilterInputStream(in) {
            @Override public void close() { }
        };
    }

    static XMLInputFactory factory() {
        XMLInputFactory f = new com.fasterxml.aalto.stax.InputFactoryImpl();
        f.setProperty(XMLInputFactory.IS_COALESCING, Boolean.TRUE);
        f.setProperty(XMLInputFactory.SUPPORT_DTD, Boolean.FALSE);
        f.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, Boolean.FALSE);
        return f;
    }
}
