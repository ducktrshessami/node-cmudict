export class Entry {
    readonly pronunciations: Pronunciation[];
    readonly tags: Set<string>;

    constructor(readonly name: string, tags: Iterable<string> = []) {
        this.pronunciations = [];
        this.tags = new Set<string>(tags);
    }

    addPronunciation(pronunciation: string[], note?: string): Pronunciation {
        const newItem = new Pronunciation(
            this,
            pronunciation,
            note
        );
        this.pronunciations.push(newItem);
        return newItem;
    }

    toString(): string {
        if (this.tags && this.pronunciations.length) {
            const first = this.pronunciations[0].toString() + ` # ${[...this.tags.values()].join(", ")}`;
            return [first, ...this.pronunciations.slice(1)].join("\n");
        }
        else {
            return this.pronunciations.join("\n");
        }
    }

    toJSON() {
        return {
            name: this.name,
            pronunciations: this.pronunciations.map(pronunciation => pronunciation.toJSON()),
            tags: [...this.tags.values()]
        };
    }
}

export class Pronunciation {
    readonly phonemes: Phoneme[];

    constructor(
        readonly entry: Entry,
        phonemes: string[],
        readonly note: string | null = null
    ) {
        this.phonemes = phonemes.map(phoneme => new Phoneme(phoneme));
    }

    toString(): string {
        return `${this.entry.name} ${this.phonemes.join(" ")}`;
    }

    toJSON() {
        const json: {
            phonemes: string[];
            note?: string;
        } = { phonemes: this.phonemes.map(phoneme => phoneme.toString()) };
        if (this.note) {
            json.note = this.note;
        }
        return json;
    }
}

export class Phoneme {
    private static readonly Pattern = /^(?<phoneme>[A-Z]+)(?<stress>[0-2])?$/i;
    readonly phoneme: string;
    readonly stress: number | null;

    constructor(readonly raw: string) {
        const match = raw.match(Phoneme.Pattern)!;
        this.phoneme = match.groups!.phoneme;
        this.stress = match.groups!.stress ? parseInt(match.groups!.stress) : null;
    }

    toString(): string {
        return this.raw;
    }
}
