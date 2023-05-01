export default class Phone {
    readonly phoneme: string;
    readonly manner: `${ArticulationManner}`;

    constructor(match: RegExpMatchArray) {
        this.phoneme = match[1];
        this.manner = <`${ArticulationManner}`>match[2];
    }
}

export const PhonePattern = /^(?<phoneme>[A-Z]+)\s+(?<manner>[A-Z]+)$/gmi;
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
