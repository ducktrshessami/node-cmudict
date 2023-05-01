export class Entry {
    readonly pronunciations: Array<Pronunciation>;

    constructor(
        readonly name: string,
        pronunciation: Array<string>,
        readonly tags: Array<string> = []
    ) {
        this.pronunciations = [new Pronunciation(this, pronunciation)];
    }

    addPronunciation(pronunciation: Array<string>): Pronunciation {
        const newItem = new Pronunciation(this, pronunciation);
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
