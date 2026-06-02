//#region src/entry.d.ts
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
  equals(other: Entry): boolean;
  toString(): string;
  toJSON(): EntryData;
}
declare class Pronunciation {
  readonly entry: Entry;
  readonly note: string | null;
  readonly phonemes: Phoneme[];
  constructor(entry: Entry, phonemes: string[], note?: string | null);
  equals(other: Pronunciation): boolean;
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
//#endregion
//#region src/util.d.ts
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
//#endregion
//#region src/index.d.ts
declare function getDict(): Map<string, Entry>;
/**
 * Maps phoneme to manner of articulation
 */
declare function getPhones(): Map<string, ArticulationManner>;
declare function getSymbols(): string[];
declare function getVP(): Map<string, Entry>;
//#endregion
export { ArticulationManner, Entry, EntryData, Phoneme, Pronunciation, PronunciationData, getDict, getPhones, getSymbols, getVP };
//# sourceMappingURL=index.d.cts.map