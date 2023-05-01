export class Entry {
    readonly pronunciations: Array<Pronunciation>;

    constructor(readonly name: string, readonly tags: Array<string> = []) {
        this.pronunciations = [];
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
}

export class Pronunciation {
    constructor(
        readonly entry: Entry,
        readonly phonemes: Array<string>,
        readonly note: string | null = null
    ) { }
}
