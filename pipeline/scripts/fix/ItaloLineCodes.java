package fix;

// The Italo labelling stage: every Line carries the operator as its public code, and its name is the
// train-number pair read as a pair. The Makefile names this file by path and runs it in the Italo
// chain.
//
// Italo publishes one Line per pair of train numbers and names it after the pair -- Name and
// PublicCode both `9963_9944` -- so there is no line number for the public code to carry and the
// operator is what a rider recognises. A trailing `_#N` is the variant counter the Line's id also
// carries, so it goes before the pair is joined.
//
// Nothing here reads an id, so this is free to run anywhere in the chain. It is placed beside the
// sequence repair, ahead of the id normalisation, because that is where the feed's own shapes are
// still intact.

import toolkit.harness.DbToDb;
import toolkit.store.Store;
import toolkit.store.Txn;
import transformers.feedfix.LineCodes;

import java.util.LinkedHashMap;

public class ItaloLineCodes {

    private ItaloLineCodes() {}

    public static void main(String[] args) {
        DbToDb.driverMain("italo-line-codes", args, ItaloLineCodes::apply);
    }

    public static void apply(Store src, Txn stx, Store dst, Txn dtx) {
        dst.cloneFrom(src, stx, dtx, null, 0);
        dst.insertAnyObjects(dtx, LineCodes.repairLineCodes(
                src, stx, LineCodes.Policy.ITALO, new LinkedHashMap<>()).iterator());
    }
}
