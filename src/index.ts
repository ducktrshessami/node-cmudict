import { ArticulationManner, PhonePattern } from "./phone";
import read from "./read";
import { mapIt } from "./util";

/**
 * Maps phone to manner of articulation
 */
export const Phones = new Map<string, `${ArticulationManner}`>(
    mapIt(
        read("cmudict.phones")
            .matchAll(PhonePattern),
        match => [match[1], <`${ArticulationManner}`>match[2]]
    )
);
export { ArticulationManner };

const SymbolPattern = /^\S+$/gm;
export const Symbols: Array<string> = read("cmudict.symbols")
    .match(SymbolPattern)!;
