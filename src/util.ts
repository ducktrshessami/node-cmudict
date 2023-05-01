import { Entry } from "./entry";
import read from "./read";

export function mapIt<T, R>(it: Iterable<T>, fn: (v: T) => R): Array<R> {
    const result = new Array<R>();
    for (const value of it) {
        result.push(fn(value));
    }
    return result;
}

export function readPronunciations(filename: string, pattern: RegExp): Map<string, Entry> {
    const entries = new Map<string, Entry>();
    for (const match of read(filename).matchAll(pattern)) {
        const entry = entries.get(match.groups!.name) ?? new Entry(match.groups!.name);
        match.groups!.tags
            ?.split(", ")
            .forEach(tag => entry.tags.add(tag));
        entry.addPronunciation(match.groups!.phonemes.split(" "), match.groups!.note);
        entries.set(entry.name, entry);
    }
    return entries;
}
