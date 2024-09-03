interface PronunciationData {
    phonemes: string[];
    note?: string;
}
interface EntryData {
    name: string;
    pronunciations: PronunciationData[];
    tags: string[];
}
declare class Entry {
    readonly name: string;
    readonly pronunciations: Pronunciation[];
    readonly tags: Set<string>;
    constructor(name: string, tags?: Iterable<string>);
    addPronunciation(pronunciation: string[], note?: string): Pronunciation;
    toString(): string;
    toJSON(): EntryData;
}
declare class Pronunciation {
    readonly entry: Entry;
    readonly note: string | null;
    readonly phonemes: Phoneme[];
    constructor(entry: Entry, phonemes: string[], note?: string | null);
    toString(): string;
    toJSON(): PronunciationData;
}
declare class Phoneme {
    readonly raw: string;
    private static readonly Pattern;
    readonly phoneme: string;
    readonly stress: number | null;
    constructor(raw: string);
    toString(): string;
}

declare enum ArticulationManner {
    Stop = "stop",
    Nasal = "nasal",
    Fricative = "fricative",
    Affricate = "affricate",
    Liquid = "liquid",
    Semivowel = "semivowel",
    Vowel = "vowel",
    Aspirate = "aspirate"
}

declare function getDict(): Map<string, Entry>;
/**
 * Maps phoneme to manner of articulation
 */
declare function getPhones(): Map<string, `${ArticulationManner}`>;
declare function getSymbols(): string[];
declare function getVP(): Map<string, Entry>;

export { ArticulationManner, Entry, type EntryData, Phoneme, Pronunciation, type PronunciationData, getDict, getPhones, getSymbols, getVP };
