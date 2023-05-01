import { readFileSync } from "fs";
import { Entry } from "./entry";

export enum ArticulationManner {
    Stop = "stop",
    Nasal = "nasal",
    Fricative = "fricative",
    Affricate = "affricate",
    Liquid = "liquid",
    Semivowel = "semivowel",
    Vowel = "vowel",
    Aspirate = "aspirate"
}

export function mapIt<T, R>(it: Iterable<T>, fn: (v: T) => R): Array<R> {
    const result = new Array<R>();
    for (const value of it) {
        result.push(fn(value));
    }
    return result;
}

export function read(filename: string): string {
    return readFileSync(require.resolve(`cmudict/${filename}`), { encoding: "utf8" });
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