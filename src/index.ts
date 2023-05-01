import { Entry } from "./entry";
import { ArticulationManner, PhonePattern } from "./phone";
import read from "./read";
import { mapIt } from "./util";

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
export { ArticulationManner };

const SymbolPattern = /^\S+$/gm;
export const Symbols: Array<string> = read("cmudict.symbols")
    .match(SymbolPattern)!;

// WTF does 'vp' mean?
const VPPattern = /^(?<name>[^A-Z\s]+)(?<note>[^\s()]+)?(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?: |$))+)/mgi;
export const VP = new Map<string, Entry>();
for (const match of read("cmudict.vp").matchAll(VPPattern)) {
    const entry = VP.get(match.groups!.name) ?? new Entry(match.groups!.name);
    entry.addPronunciation(match.groups!.phonemes.split(" "), match.groups!.note);
    VP.set(entry.name, entry);
}
