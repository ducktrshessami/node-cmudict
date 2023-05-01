export class Entry {
    readonly pronunciations: Array<Pronunciation>;
    readonly tags: Set<string>;

    constructor(readonly name: string, tags: Iterable<string> = []) {
        this.pronunciations = [];
        this.tags = new Set<string>(tags);
    }

    addPronunciation(pronunciation: Array<string>, note?: string): Pronunciation {
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
            tags: this.tags
        };
    }
}

export class Pronunciation {
    constructor(
        readonly entry: Entry,
        readonly phonemes: Array<string>,
        readonly note: string | null = null
    ) { }

    toString(): string {
        return `${this.entry.name} ${this.phonemes.join(" ")}`;
    }

    toJSON() {
        const json: {
            phonemes: Array<string>;
            note?: string
        } = { phonemes: this.phonemes };
        if (this.note) {
            json.note = this.note;
        }
        return json;
    }
}
