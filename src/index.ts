import {
    Entry,
    Phoneme as Phone,
    Pronunciation as Pronounce
} from "./entry";
import {
    ArticulationManner,
    mapIt,
    read,
    readPronunciations
} from "./util";

const WordPattern = /^(?<name>[^\s()]+)(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?:(?= #)| |$))+)(?: # (?<tags>(?:[^\s,]+(?:$|[\s,]+))+))?$/gmi;
export const Dict = readPronunciations("cmudict.dict", WordPattern);

const PhonePattern = /^(?<phoneme>[A-Z]+)\s+(?<manner>[A-Z]+)$/gmi;
/**
 * Maps phoneme to manner of articulation
 */
export const Phones = new Map<string, `${ArticulationManner}`>(
    mapIt(
        read("cmudict.phones")
            .matchAll(PhonePattern),
        match => [match[1], <`${ArticulationManner}`>match[2]]
    )
);

const SymbolPattern = /^\S+$/gm;
export const Symbols: Array<string> = read("cmudict.symbols")
    .match(SymbolPattern)!;

// WTF does 'vp' mean?
const VPPattern = /^(?<name>[^A-Z\s]+)(?<note>[^\s()]+)?(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?: |$))+)/gmi;
export const VP = readPronunciations("cmudict.vp", VPPattern);

export type Pronunciation = Pronounce;
export type Phoneme = Phone;
export { ArticulationManner, Entry };