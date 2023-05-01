declare class Entry {
    readonly name: string;
    readonly pronunciations: Array<Pronunciation$1>;
    readonly tags: Set<string>;
    constructor(name: string, tags?: Iterable<string>);
    addPronunciation(pronunciation: Array<string>, note?: string): Pronunciation$1;
    toString(): string;
    toJSON(): {
        name: string;
        pronunciations: {
            phonemes: string[];
            note?: string | undefined;
        }[];
        tags: string[];
    };
}
declare class Pronunciation$1 {
    readonly entry: Entry;
    readonly note: string | null;
    readonly phonemes: Array<Phoneme$1>;
    constructor(entry: Entry, phonemes: Array<string>, note?: string | null);
    toString(): string;
    toJSON(): {
        phonemes: Array<string>;
        note?: string | undefined;
    };
}
declare class Phoneme$1 {
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

declare const Dict: Map<string, Entry>;
/**
 * Maps phoneme to manner of articulation
 */
declare const Phones: Map<string, "stop" | "nasal" | "fricative" | "affricate" | "liquid" | "semivowel" | "vowel" | "aspirate">;
declare const Symbols: Array<string>;
declare const VP: Map<string, Entry>;
type Pronunciation = Pronunciation$1;
type Phoneme = Phoneme$1;

export { ArticulationManner, Dict, Entry, Phoneme, Phones, Pronunciation, Symbols, VP };
