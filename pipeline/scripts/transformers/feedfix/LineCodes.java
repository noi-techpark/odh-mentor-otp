package transformers.feedfix;

// What a publisher put in Line/PublicCode when the field wants the number a rider reads.
//
// OTP takes a route's short name off Line/PublicCode and its long name off Line/Name, so a feed that
// fills PublicCode with an internal composite gives every route on it a badge no rider recognises.
// The repairs key on the RELATIONSHIP between a Line's fields
// rather than on parsing the composite -- the separator vocabulary is per publisher and open-ended
// (`A_ATV`, `11_UL_terra_ACTVs.p.a`, `211_OP1`, `620083_pass_0083`) while the relationship is not.
//
// Naming a line is NOT here. These arms move a value the publisher already wrote into the field that
// wants it; they invent nothing. A line that states no name anywhere is named after the two places
// it runs between, which needs the whole corpus and happens in the EPIP transform.
//
// Veneto's ACTV publishes it as <ShortName>_<class>_<medium>_<operator>, the medium distinguishing
// land from water, so parsing would have to know `terra` from `mare` from `UL`. IT-1 needs to know
// none of them.

import noi.netex.model.Line;
import noi.netex.text.Codes;
import noi.netex.text.Mls;
import toolkit.store.Store;
import toolkit.store.Txn;
import toolkit.util.Log;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class LineCodes {

    private LineCodes() {}

    /// Which publisher's shapes to repair. Each names the arms that fire, so a feed only ever meets
    /// the rules written for it.
    public enum Policy {
        /// IT-1 and IT-2: the Italian regional and national access-point feeds.
        IT_RAP
    }

    /// The Lines `policy` repaired, over `db` at `txn`, composed onto whatever `pending` already
    /// holds for an id. Decoding a row twice gives two objects, so an id `pending` covers is
    /// repaired on the object `pending` holds and every other on a freshly decoded one, leaving the
    /// caller one object per id to overlay.
    ///
    /// Per id and not per (id, version) row, deliberately: the only caller that passes a non-empty
    /// map is the RAP driver, whose `planOverlay` collapses every stored version of a changed id
    /// onto the overlay object's version. One object per id is exactly what that consumes. A caller
    /// overlaying rows one for one must pass an empty map and take the per-row list back.
    ///
    /// FlexibleLine is not read: no feed these policies cover publishes one.
    public static List<Line> repairLineCodes(Store db, Txn txn, Policy policy,
                                            Map<String, Line> pending) {
        List<Line> out = new ArrayList<>();
        long codes = 0;
        long names = 0;
        for (Object o : db.iterOnlyObjects(txn, Line.class)) {
            Line line = (Line) o;
            Line target = pending.getOrDefault(line.getId(), line);
            boolean code = false;
            boolean name = false;
            switch (policy) {
                case IT_RAP -> {
                    code = takeShortNameAsPublicCode(target);
                    name = takeDescriptionAsName(target);
                }
            }
            if (code) codes++;
            if (name) names++;
            if (code || name) out.add(target);
        }
        Log.info("[line-codes] %s: %,d public codes and %,d names repaired over %,d lines",
                policy, codes, names, out.size());
        return out;
    }

    /// IT-1. A PublicCode that is blank or repeats the PrivateCode is an internal value in a public
    /// field; the ShortName beside it is the code a rider reads. Whether it fired.
    static boolean takeShortNameAsPublicCode(Line line) {
        String shortName = Mls.text(line.getShortName());
        if (shortName == null || shortName.isBlank()) return false;
        String code = Codes.text(line.getPublicCode());
        String privateCode = line.getPrivateCode() == null ? null : line.getPrivateCode().getValue();
        boolean blank = code == null || code.isBlank();
        if (!blank && !shortName.equals(code) && !code.equals(privateCode)) return false;
        if (shortName.equals(code)) return false;
        line.setPublicCode(Codes.of(shortName));
        return true;
    }

    /// IT-2. A Name repeating one of the Line's own codes names nothing; where the Description holds
    /// something else it is the label the feed wrote. Whether it fired.
    static boolean takeDescriptionAsName(Line line) {
        String name = Mls.text(line.getName());
        if (name == null || name.isBlank()) return false;
        String description = Mls.text(line.getDescription());
        if (description == null || description.isBlank() || description.equals(name)) return false;
        if (!name.equals(Codes.text(line.getPublicCode()))
                && !name.equals(Mls.text(line.getShortName()))
                && !(line.getPrivateCode() != null
                        && name.equals(line.getPrivateCode().getValue()))) {
            return false;
        }
        Mls.setText(line.getName(), description);
        return true;
    }

}
