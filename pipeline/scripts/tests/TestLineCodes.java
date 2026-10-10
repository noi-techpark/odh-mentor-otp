package tests;

// The Line/PublicCode repairs, one fixture Line per shape the merge meets.
//
// Each rule keys on the relationship between a Line's fields rather than on parsing the composite,
// which is what makes one rule cover `_ATV`, `_UL_terra_`, `_mare_`, `_OP1` and `_pass_` alike. The
// `_pass_` line is a Trenitalia regional republication, excluded from the allowlist today and kept
// here so the rule is pinned against its return.

import noi.netex.model.Line;
import noi.netex.text.Codes;
import noi.netex.text.Mls;
import toolkit.store.Txn;
import toolkit.test.Check;
import toolkit.test.Runner;
import toolkit.test.TestStore;
import transformers.feedfix.LineCodes;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TestLineCodes {

    private static final String IT_FRAMES = """
        <ServiceFrame id="sf" version="1">
          <lines>
            <Line id="IT:ITH3:Line:A_ATV" version="1"><Name>LEGNAGO PORTO - TERRANEGRA</Name><ShortName>A</ShortName><Description>LEGNAGO PORTO - TERRANEGRA</Description><TransportMode>bus</TransportMode><PublicCode>A_ATV</PublicCode><PrivateCode>A_ATV</PrivateCode></Line>
            <Line id="IT:ITH3:Line:11_UL_terra_ACTV" version="1"><Name>Santa Maria Elisabetta - Pellestrina</Name><ShortName>11</ShortName><Description>UL</Description><TransportMode>bus</TransportMode><PublicCode>11_UL_terra_ACTV</PublicCode><PrivateCode>11_UL_terra_ACTV</PrivateCode></Line>
            <Line id="IT:ITH3:Line:5_UM_mare_ACTV" version="1"><Name>Burano - Torcello</Name><ShortName>5.1</ShortName><Description>UM</Description><TransportMode>water</TransportMode><PublicCode>5_UM_mare_ACTV</PublicCode><PrivateCode>5_UM_mare_ACTV</PrivateCode></Line>
            <Line id="IT:ITI4:Line:211_OP1" version="1"><Name>211</Name><ShortName>211</ShortName><Description>211</Description><TransportMode>bus</TransportMode><PublicCode>211_OP1</PublicCode><PrivateCode>211_OP1</PrivateCode></Line>
            <Line id="IT:ITF3:Line:01-CE" version="1"><Name>01-CE</Name><ShortName>01-CE</ShortName><Description>Caserta-S.Maria C.V.-Capua</Description><TransportMode>bus</TransportMode><PublicCode/><PrivateCode>01-CE</PrivateCode></Line>
            <Line id="IT:ITI4:Line:620083_pass_0083" version="1"><Name>Regionale Veloce</Name><ShortName>RV</ShortName><TransportMode>rail</TransportMode><PublicCode>620083_pass_0083</PublicCode><PrivateCode>620083_pass_0083</PrivateCode></Line>
            <Line id="IT::Line:railTRENITALIA:60083" version="1"><Name>Eurocity</Name><ShortName>EC</ShortName><TransportMode>rail</TransportMode><PublicCode>EC</PublicCode><PrivateCode>60083</PrivateCode></Line>
            <Line id="IT:ITC2:Line:110" version="1"><Name>AOSTA/PONT-SAINT-MARTIN</Name><ShortName>110</ShortName><TransportMode>bus</TransportMode><PublicCode>110</PublicCode><PrivateCode>10110</PrivateCode></Line>
            <Line id="IT:ITF1:Line:TNLINE495" version="1"><Name>S.U. LANCIANO LINEA 2/</Name><Description>S.U. LANCIANO LINEA 2/</Description><TransportMode>bus</TransportMode></Line>
            <Line id="IT:ITALO:Line:9963-9944-1-1" version="1"><Name>9963_9944</Name><TransportMode>rail</TransportMode><PublicCode>9963_9944</PublicCode></Line>
            <Line id="IT:ITALO:Line:1045-9961--1-1-1" version="1"><Name>1045_9961_#1</Name><TransportMode>rail</TransportMode><PublicCode>1045_9961_#1</PublicCode></Line>
            <Line id="IT:ITALO:Line:9997-1-1" version="1"><Name>9997</Name><TransportMode>rail</TransportMode><PublicCode>9997</PublicCode></Line>
          </lines>
        </ServiceFrame>
        """;

    public static void main(String[] args) {
        Runner.run(TestLineCodes.class);
    }

    private static Map<String, Line> run(TestStore db, String frames, LineCodes.Policy policy)
            throws Exception {
        db.loadNetex(frames);
        Map<String, Line> out = new LinkedHashMap<>();
        try (Txn txn = db.store.roTxn()) {
            for (Line l : LineCodes.repairLineCodes(db.store, txn, policy, new LinkedHashMap<>())) {
                out.put(l.getId(), l);
            }
        }
        return out;
    }

    /// Every composite shape, land and water, plus the republication that is excluded today.
    public static void testAnInternalCompositeGivesWayToTheShortName(TestStore db) throws Exception {
        Map<String, Line> fixed = run(db, IT_FRAMES, LineCodes.Policy.IT_RAP);

        Check.equals("A", Codes.text(fixed.get("IT:ITH3:Line:A_ATV").getPublicCode()),
                "an operator-suffixed code gives way to the ShortName");
        Check.equals("11", Codes.text(fixed.get("IT:ITH3:Line:11_UL_terra_ACTV").getPublicCode()),
                "and so does a class-and-medium composite, with no separator parsed");
        Check.equals("5.1", Codes.text(fixed.get("IT:ITH3:Line:5_UM_mare_ACTV").getPublicCode()),
                "the water medium takes the same rule as the land one");
        Check.equals("211", Codes.text(fixed.get("IT:ITI4:Line:211_OP1").getPublicCode()),
                "an operator suffix on a numbered line goes too");
        Check.equals("01-CE", Codes.text(fixed.get("IT:ITF3:Line:01-CE").getPublicCode()),
                "an EMPTY PublicCode element counts as absent, so the ShortName fills it");
        Check.equals("RV", Codes.text(fixed.get("IT:ITI4:Line:620083_pass_0083").getPublicCode()),
                "a _pass_ republication is covered without a rule of its own");
    }

    /// The Name is only taken from the Description where the Name is one of the Line's own codes.
    public static void testANameRepeatingACodeGivesWayToTheDescription(TestStore db)
            throws Exception {
        Map<String, Line> fixed = run(db, IT_FRAMES, LineCodes.Policy.IT_RAP);

        Check.equals("Caserta-S.Maria C.V.-Capua",
                Mls.text(fixed.get("IT:ITF3:Line:01-CE").getName()),
                "a Name repeating the code gives way to the Description");
        Check.equals("LEGNAGO PORTO - TERRANEGRA",
                Mls.text(fixed.get("IT:ITH3:Line:A_ATV").getName()),
                "a Name that is already a label is kept, Description or not");
        Check.equals("Santa Maria Elisabetta - Pellestrina",
                Mls.text(fixed.get("IT:ITH3:Line:11_UL_terra_ACTV").getName()),
                "and a Description holding only the service class does not become a name");
    }

    /// The rule has to be a no-op on a feed that already publishes a public code.
    public static void testACorrectlyCodedLineIsLeftAlone(TestStore db) throws Exception {
        Map<String, Line> fixed = run(db, IT_FRAMES, LineCodes.Policy.IT_RAP);

        Check.isNull(fixed.get("IT::Line:railTRENITALIA:60083"),
                "Trenitalia's EC line is untouched: its PublicCode differs from its PrivateCode");
        Check.isNull(fixed.get("IT:ITC2:Line:110"),
                "and so is a line whose PublicCode already equals its ShortName");
        Check.isNull(fixed.get("IT:ITF1:Line:TNLINE495"),
                "a line with no code anywhere gets nothing invented for it");
    }

    /// Both Italian chains end on one driver, which applies the access-point rules. They have to be
    /// unable to fire on Italo, whose own stage does its labelling: its Lines carry no ShortName,
    /// which IT-1 needs, and no Description, which IT-2 needs.
    public static void testTheAccessPointRulesCannotFireOnItalo(TestStore db) throws Exception {
        Map<String, Line> fixed = run(db, IT_FRAMES, LineCodes.Policy.IT_RAP);

        for (String id : List.of("IT:ITALO:Line:9963-9944-1-1", "IT:ITALO:Line:1045-9961--1-1-1",
                "IT:ITALO:Line:9997-1-1")) {
            Check.isNull(fixed.get(id), id + " is untouched by the access-point rules");
        }
    }

    public static void testItaloTakesTheOperatorAndSpellsThePair(TestStore db) throws Exception {
        Map<String, Line> fixed = run(db, IT_FRAMES, LineCodes.Policy.ITALO);

        Line pair = fixed.get("IT:ITALO:Line:9963-9944-1-1");
        Check.equals("Italo", Codes.text(pair.getPublicCode()),
                "every Italo line carries the operator, there being no line number to carry");
        Check.equals("9963 / 9944", Mls.text(pair.getName()), "and the pair read as a pair");

        Line variant = fixed.get("IT:ITALO:Line:1045-9961--1-1-1");
        Check.equals("1045 / 9961", Mls.text(variant.getName()),
                "the trailing _#N is the variant counter the id also carries, so it goes first");

        Line single = fixed.get("IT:ITALO:Line:9997-1-1");
        Check.equals("Italo", Codes.text(single.getPublicCode()), "a single number still gets the code");
        Check.equals("9997", Mls.text(single.getName()), "and its name is left as the one number");
    }

    /// A Line two passes both touch has to reach the overlay as one object carrying both repairs.
    public static void testRepairsComposeOnAPendingObject(TestStore db) throws Exception {
        db.loadNetex(IT_FRAMES);
        try (Txn txn = db.store.roTxn()) {
            Map<String, Line> pending = new LinkedHashMap<>();
            List<Line> first = LineCodes.repairLineCodes(
                    db.store, txn, LineCodes.Policy.IT_RAP, pending);
            for (Line l : first) pending.put(l.getId(), l);

            // A second run over the same pending map must find nothing left to do, which is what
            // says the first run's writes are on the objects the caller holds.
            List<Line> second = LineCodes.repairLineCodes(
                    db.store, txn, LineCodes.Policy.IT_RAP, pending);
            Check.equals(0, second.size(),
                    "a second pass over the repaired objects changes nothing: " + second.size());
        }
    }
}
