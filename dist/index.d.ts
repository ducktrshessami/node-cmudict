declare class Entry {
    readonly name: string;
    readonly pronunciations: Array<Pronunciation>;
    readonly tags: Set<string>;
    constructor(name: string, tags?: Iterable<string>);
    addPronunciation(pronunciation: Array<string>, note?: string): Pronunciation;
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
declare class Pronunciation {
    readonly entry: Entry;
    readonly note: string | null;
    readonly phonemes: Array<Phoneme>;
    constructor(entry: Entry, phonemes: Array<string>, note?: string | null);
    toString(): string;
    toJSON(): {
        phonemes: Array<string>;
        note?: string | undefined;
    };
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

export { ArticulationManner, Entry, Phoneme, Pronunciation, getDict, getPhones, getSymbols, getVP };
