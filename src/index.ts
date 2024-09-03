import { Entry } from "./entry";
import {
    ArticulationManner,
    mapIt,
    read,
    readPronunciations
} from "./util";

export function getDict(): Map<string, Entry> {
    return readPronunciations("cmudict.dict", /^(?<name>[^\s()]+)(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?:(?= #)| |$))+)(?: # (?<tags>(?:[^\s,]+(?:$|[\s,]+))+))?$/gmi);
}

/**
 * Maps phoneme to manner of articulation
 */
export function getPhones(): Map<string, `${ArticulationManner}`> {
    return new Map<string, `${ArticulationManner}`>(
        mapIt(
            read("cmudict.phones")
                .matchAll(/^(?<phoneme>[A-Z]+)\s+(?<manner>[A-Z]+)$/gmi),
            match => [match[1], <`${ArticulationManner}`>match[2]]
        )
    );
}

export function getSymbols(): string[] {
    return read("cmudict.symbols")
        .match(/^\S+$/gm)!;
}

// WTF does 'vp' mean?
export function getVP(): Map<string, Entry> {
    return readPronunciations("cmudict.vp", /^(?<name>[^A-Z\s]+)(?<note>[^\s()]+)?(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?: |$))+)/gmi);
}

export * from "./entry";
export { ArticulationManner };
