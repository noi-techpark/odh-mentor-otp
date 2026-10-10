package conv;

// Per-operator RAP preparation in a single clone+overlay pass:
//   1. backfill StopPlace centroids from child Quays;
//   2. take a stop's name back out of ShortName where its Name holds only the stop's code;
//   3. backfill Line authorities, synthesising Authorities from Operators as needed;
//   4. nest the frame-level groups of lines into the feed's Network.
//
// 1 and 2 both overlay StopPlace, and a row decoded twice gives two objects, so 2 runs over 1's
// objects rather than over a second decode of the same rows.
//
// The authority backfill has to stay per operator: its soleAuthority shortcut assumes 0 or 1
// Authorities in scope, and nationally there are hundreds, most of them synthesised here rather
// than published.
//
// So does 4, for the same kind of reason: a RAP feed declares its groups of lines beside the
// Network rather than inside it, and NeTEx expresses that relationship by containment alone -- a
// GroupOfLines carries no reference back to its Network. One operator's feed carries one Network,
// so that Network is the one its groups belong to; nationally there is one per feed and the question
// has no answer. 4 therefore cannot move into the toolkit, which only ever sees the merged store.
//
// 4 also qualifies the group's id with --tag, and that is not cosmetic. Nesting is containment, and
// an object the store holds only inside another owns no id-index row, so the regional merge cannot
// see it to qualify: its duplicate-id probe reads the index. Meanwhile normalize-it-ids has already
// moved every feed of a region into one id space, and these ids are generic -- 17 Puglia operators
// each publish `IT:ITF4:GroupOfLines:Extraurbano` with a different membership. Left alone they
// arrive in the merged store as one (id, version) carrying seventeen disjoint member lists, and the
// embedding resolver wires every operator's Lines onto whichever copy it scans first. The suffix is
// the same `<id>:<tag>` shape the merge would have produced had the rows stayed at frame level, so
// the result is what that path yields, reached at the only tier that still knows which feed this is.

import it.unimi.dsi.fastutil.longs.LongArrayList;
import it.unimi.dsi.fastutil.longs.LongOpenHashSet;
import noi.netex.model.Authority;
import noi.netex.model.EntityInVersionStructure;
import noi.netex.model.EntityStructure;
import noi.netex.model.FlexibleLine;
import noi.netex.model.GroupOfLines;
import noi.netex.model.GroupOfLinesRefStructure;
import noi.netex.model.GroupsOfLinesInFrame_RelStructure;
import noi.netex.model.Line;
import noi.netex.model.Line_VersionStructure;
import noi.netex.model.Network;
import noi.netex.model.PassengerStopAssignment;
import noi.netex.model.StopPlace;
import toolkit.harness.Args;
import toolkit.harness.DbToDb;
import toolkit.keycodec.NulKeyCodec;
import toolkit.store.ObjectRow;
import toolkit.store.Store;
import toolkit.store.Txn;
import toolkit.transform.common.LineAuthorities;
import toolkit.transform.common.ScheduledStopPoints;
import toolkit.transform.epip.GeneratorDefaults;
import toolkit.util.Log;
import transformers.feedfix.CodeNames;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ItRapDbToDb {

    /// Hand-rolled rather than [DbToDb#driverMain] for `--tag`, which that CLI has no slot for.
    public static void main(String[] args) throws Exception {
        Args a = Args.parse(args,
                "ItRapDbToDb <src> <target> [--tag OPERATOR] [--format v2] [--log-file F]",
                "--tag=", "--format=", "--log-file=").expectPositional(2);
        String logFile = a.get("--log-file", null);
        if (logFile != null) Log.toFile(Path.of(logFile));
        String tag = a.get("--tag", null);
        DbToDb.runDbToDb((s, stx, d, dtx) -> applyItRap(s, stx, d, dtx, tag),
                Path.of(a.positional().get(0)), Path.of(a.positional().get(1)),
                "it-rap-db-to-db", a.get("--format", null));
    }

    /// Named so tests can run it via TestStore.runDbToDb, without the CLI sandwich. A feed whose
    /// operator is unknown nests its groups under their published ids, which is what every caller
    /// before `--tag` did.
    public static void applyItRap(Store src, Txn stx, Store dst, Txn dtx) {
        applyItRap(src, stx, dst, dtx, null);
    }

    /// raw-clone source into target applying the RAP-readiness overlays.
    public static void applyItRap(Store src, Txn stx, Store dst, Txn dtx, String tag) {
        List<ObjectRow> spRows = rows(src, stx, StopPlace.class);
        List<ObjectRow> psaRows = rows(src, stx, PassengerStopAssignment.class);
        List<ObjectRow> lineRows = rows(src, stx, Line.class);
        List<ObjectRow> flexRows = rows(src, stx, FlexibleLine.class);
        List<ObjectRow> netRows = rows(src, stx, Network.class);
        List<ObjectRow> golRows = rows(src, stx, GroupOfLines.class);

        Map<String, StopPlace> stopFixed = new LinkedHashMap<>();
        for (StopPlace sp : ScheduledStopPoints.backfillStopplaceCentroidsFromQuays(src, stx)) {
            stopFixed.put(sp.getId(), sp);
        }
        for (StopPlace sp : CodeNames.repairCodeNames(src, stx, stopFixed)) {
            stopFixed.put(sp.getId(), sp);
        }

        // The per-feed run of the same pass the EPIP conversion runs nationally. The codespace is
        // only reached for an Operator whose id carries no class token, which a RAP feed's do, so
        // this takes the profile's default rather than growing an EPIP_CODESPACE flag of its own.
        List<Object> authorityOverlay = LineAuthorities.backfillLineAuthorities(src, stx,
                GeneratorDefaults.PRODUCTION.codespace());
        // A FlexibleLine is not a Line — they are siblings under Line_VersionStructure — so it needs
        // its own branch and its own overlay. Folding it into the Line one would cast it to
        // Authority here, and overlay it under a class index that holds no such row there.
        Map<String, Object> lineFixed = new LinkedHashMap<>();
        Map<String, Object> flexFixed = new LinkedHashMap<>();
        Map<String, Object> netFixed = new LinkedHashMap<>();
        List<Authority> newAuthorities = new ArrayList<>();
        for (Object o : authorityOverlay) {
            if (o instanceof Line l) lineFixed.put(l.getId(), l);
            else if (o instanceof FlexibleLine f) flexFixed.put(f.getId(), f);
            else if (o instanceof Network n) netFixed.put(n.getId(), n);
            else newAuthorities.add((Authority) o);
        }

        // 4. The group-of-lines hierarchy, AFTER the backfill on purpose: the backfill leaves a Line
        // alone when its group already resolves to an authority-bearing Network, so nesting first
        // would stop it giving these Lines the direct authorityRef they carry today. Both survive
        // this way -- the profile lists AuthorityRef and RepresentByGroupRef as separate fields.
        //
        // The frame-level rows go: the groups are the Network's children now, and leaving the rows
        // behind would have the export emit each group twice, once nested and once in the frame's
        // own container.
        Map<String, Network> networks = byId(netRows, Network.class);
        // Old group id -> the id it was qualified to, for the Lines that name it below.
        Map<String, String> groupRenames = new LinkedHashMap<>();
        boolean nested = networks.size() == 1 && !golRows.isEmpty();
        if (nested) {
            String netId = networks.keySet().iterator().next();
            Network net = netFixed.get(netId) instanceof Network repaired
                    ? repaired : networks.get(netId);
            GroupsOfLinesInFrame_RelStructure container = net.getGroupsOfLines();
            if (container == null) {
                container = new GroupsOfLinesInFrame_RelStructure();
                net.setGroupsOfLines(container);
            }
            // Every ROW, not one per id: the rows all leave the frame, so nesting one of them would
            // drop a second version of a group the feed publishes twice.
            for (ObjectRow r : golRows) {
                GroupOfLines g = (GroupOfLines) r.object();
                String was = g.getId();
                if (tag != null && was != null && !was.endsWith(":" + tag)) {
                    g.setId(was + ":" + tag);
                    groupRenames.put(was, g.getId());
                }
                container.getGroupOfLines().add(g);
            }
            netFixed.put(netId, net);
            Log.info("[it-rap-db-to-db] nested %d groups of lines into %s, %d of them qualified "
                    + "with %s", golRows.size(), netId, groupRenames.size(), tag);
        } else if (!golRows.isEmpty()) {
            Log.info("[it-rap-db-to-db] %d groups of lines left at frame level: %d Networks in "
                    + "scope, so which one owns them is not decidable here",
                    golRows.size(), networks.size());
        }
        // A Line naming a renamed group has to be rewritten with it: the ref is matched on the
        // embedded entity's (id, version, class), so leaving it would dangle the only link a Line
        // has to its Network.
        long repointed = repointGroupRefs(lineRows, lineFixed, groupRenames)
                + repointGroupRefs(flexRows, flexFixed, groupRenames);
        if (repointed > 0) {
            Log.info("[it-rap-db-to-db] %d lines re-pointed at a qualified group", repointed);
        }

        Map<String, Object> stopOverlay = new LinkedHashMap<>(stopFixed);

        LongOpenHashSet skip = new LongOpenHashSet();       // rows the clone must not copy
        LongOpenHashSet reinserted = new LongOpenHashSet(); // rows overwritten in place below
        List<Object> overlayInserts = new ArrayList<>();

        planOverlay(src, spRows, StopPlace.class, stopOverlay, Set.of(), skip, reinserted, overlayInserts);
        planOverlay(src, psaRows, PassengerStopAssignment.class, Map.of(), Set.of(), skip, reinserted, overlayInserts);
        planOverlay(src, lineRows, Line.class, lineFixed, Set.of(), skip, reinserted, overlayInserts);
        planOverlay(src, flexRows, FlexibleLine.class, flexFixed, Set.of(), skip, reinserted, overlayInserts);
        planOverlay(src, netRows, Network.class, netFixed, Set.of(), skip, reinserted, overlayInserts);
        // Delete-by-omission for the nested groups, by full key rather than through planOverlay's
        // droppedIds: that matches on the row object's current id, and the qualification above has
        // already rewritten it.
        if (nested) {
            for (ObjectRow r : golRows) skip.add(src.fullKeyOf(GroupOfLines.class, r.localKey()));
        }

        List<Object> newInserts = new ArrayList<>(newAuthorities);

        // The clone drops an index row whose referenced side was skipped, so a resolved referrer
        // outside the re-inserted set has to be re-inserted for its reference to re-extract.
        LongOpenHashSet patch = toolkit.harness.CloneSupport.referrerFullKeys(src, stx, skip, reinserted);

        dst.cloneFrom(src, stx, dtx, skip.isEmpty() ? null : skip::contains, 0);
        dst.insertAnyObjects(dtx, overlayInserts);
        dst.insertAnyObjects(dtx, newInserts);
        if (!patch.isEmpty()) {
            dst.insertAnyObjects(dtx, toolkit.harness.CloneSupport.loadPatchObjects(src, stx, patch));
        }
    }

    /// Point every Line of `rows` whose group ref names a key of `renames` at the renamed group,
    /// writing onto the object `fixed` already holds for that id where there is one so the two
    /// repairs reach the overlay together; how many were re-pointed.
    private static long repointGroupRefs(List<ObjectRow> rows, Map<String, Object> fixed,
                                         Map<String, String> renames) {
        if (renames.isEmpty()) return 0;
        long repointed = 0;
        for (ObjectRow r : rows) {
            Line_VersionStructure row = (Line_VersionStructure) r.object();
            Line_VersionStructure line = fixed.get(row.getId()) instanceof Line_VersionStructure held
                    ? held : row;
            GroupOfLinesRefStructure ref = line.getRepresentedByGroupRef();
            if (ref == null) continue;
            String renamed = renames.get(ref.getRef());
            if (renamed == null) continue;
            ref.setRef(renamed);
            fixed.put(line.getId(), line);
            repointed++;
        }
        return repointed;
    }

    /// The rows' objects by id, one per id — a class map may hold several versions of one.
    private static <T> Map<String, T> byId(List<ObjectRow> rows, Class<T> clazz) {
        Map<String, T> out = new LinkedHashMap<>();
        for (ObjectRow r : rows) {
            T obj = clazz.cast(r.object());
            out.putIfAbsent(((EntityStructure) obj).getId(), obj);
        }
        return out;
    }

    private static List<ObjectRow> rows(Store db, Txn txn, Class<?> clazz) {
        List<ObjectRow> out = new ArrayList<>();
        for (ObjectRow r : db.iterObjects(txn, clazz)) out.add(r);
        return out;
    }

    /// Overlay by id over a raw clone, with delete-by-omission for droppedIds: unchanged rows stay
    /// cloned bytes, a changed row is overwritten in place, and a row of the same id but a
    /// different version is skipped — every stored version of a changed id collapses onto the
    /// overlay object's.
    private static void planOverlay(Store src, List<ObjectRow> rows, Class<?> clazz,
            Map<String, ? extends Object> overlay, Set<String> droppedIds,
            LongOpenHashSet skip, LongOpenHashSet reinserted, List<Object> overlayInserts) {
        int cidx = src.classIdxInt(clazz);
        Map<String, Object> chosen = new LinkedHashMap<>();
        for (ObjectRow row : rows) {
            EntityStructure obj = (EntityStructure) row.object();
            long fk = src.fullKeyOf(clazz, row.localKey());
            if (obj.getId() != null && droppedIds.contains(obj.getId())) {
                skip.add(fk);
                continue;
            }
            Object overlayObj = overlay.get(obj.getId());
            if (overlayObj == null) continue;
            chosen.putIfAbsent(obj.getId(), overlayObj);
            if (java.util.Objects.equals(version(overlayObj), version(obj))) {
                reinserted.add(fk);
            } else {
                skip.add(fk);
            }
        }
        overlayInserts.addAll(chosen.values());
    }

    private static String version(Object o) {
        return o instanceof EntityInVersionStructure e ? e.getVersion() : null;
    }
}
