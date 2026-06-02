Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let fs = require("fs");
let path = require("path");
let url = require("url");
//#region src/entry.ts
var Entry = class {
	name;
	pronunciations;
	tags;
	constructor(name, tags = []) {
		this.name = name;
		this.pronunciations = [];
		this.tags = new Set(tags);
	}
	addPronunciation(pronunciation, note) {
		const newItem = new Pronunciation(this, pronunciation, note);
		this.pronunciations.push(newItem);
		return newItem;
	}
	equals(other) {
		return this.toString() === other.toString();
	}
	toString() {
		if (this.tags && this.pronunciations.length) return [this.pronunciations[0].toString() + ` # ${[...this.tags.values()].join(", ")}`, ...this.pronunciations.slice(1)].join("\n");
		else return this.pronunciations.join("\n");
	}
	toJSON() {
		return {
			name: this.name,
			pronunciations: this.pronunciations.map((pronunciation) => pronunciation.toJSON()),
			tags: [...this.tags.values()]
		};
	}
};
var Pronunciation = class {
	entry;
	note;
	phonemes;
	constructor(entry, phonemes, note = null) {
		this.entry = entry;
		this.note = note;
		this.phonemes = phonemes.map((phoneme) => new Phoneme(phoneme));
	}
	equals(other) {
		return this.toString() === other.toString();
	}
	toString() {
		return `${this.entry.name} ${this.phonemes.join(" ")}`;
	}
	toJSON() {
		const json = { phonemes: this.phonemes.map((phoneme) => phoneme.toString()) };
		if (this.note) json.note = this.note;
		return json;
	}
};
var Phoneme = class Phoneme {
	raw;
	static Pattern = /^(?<phoneme>[A-Z]+)(?<stress>[0-2])?$/i;
	phoneme;
	stress;
	constructor(raw) {
		this.raw = raw;
		const match = raw.match(Phoneme.Pattern);
		this.phoneme = match.groups.phoneme;
		this.stress = match.groups.stress ? parseInt(match.groups.stress) : null;
	}
	toString() {
		return this.raw;
	}
};
//#endregion
//#region src/util.ts
function getDirname() {
	try {
		return __dirname;
	} catch {
		return (0, url.fileURLToPath)(new URL("./", require("url").pathToFileURL(__filename).href));
	}
}
const CMUdictPath = (0, path.join)(getDirname(), "../cmudict");
let ArticulationManner = /* @__PURE__ */ function(ArticulationManner) {
	ArticulationManner["Stop"] = "stop";
	ArticulationManner["Nasal"] = "nasal";
	ArticulationManner["Fricative"] = "fricative";
	ArticulationManner["Affricate"] = "affricate";
	ArticulationManner["Liquid"] = "liquid";
	ArticulationManner["Semivowel"] = "semivowel";
	ArticulationManner["Vowel"] = "vowel";
	ArticulationManner["Aspirate"] = "aspirate";
	return ArticulationManner;
}({});
function mapIt(it, fn) {
	const result = [];
	for (const value of it) result.push(fn(value));
	return result;
}
function read(filename) {
	return (0, fs.readFileSync)((0, path.join)(CMUdictPath, filename), { encoding: "utf8" });
}
function readPronunciations(filename, pattern) {
	const entries = /* @__PURE__ */ new Map();
	for (const match of read(filename).matchAll(pattern)) {
		const name = match.groups.name;
		const pronunciation = match.groups.phonemes.split(" ");
		const entry = entries.get(name) ?? new Entry(name);
		match.groups.tags?.split(", ").forEach((tag) => entry.tags.add(tag));
		entry.addPronunciation(pronunciation, match.groups.note);
		entries.set(entry.name, entry);
	}
	return entries;
}
//#endregion
//#region src/index.ts
function getDict() {
	return readPronunciations("cmudict.dict", /^(?<name>[^\s()]+)(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?:(?= #)| |$))+)(?: # (?<tags>(?:[^\s,]+(?:$|[\s,]+))+))?$/gim);
}
/**
* Maps phoneme to manner of articulation
*/
function getPhones() {
	return new Map(mapIt(read("cmudict.phones").matchAll(/^(?<phoneme>[A-Z]+)\s+(?<manner>[A-Z]+)$/gim), (match) => [match[1], match[2]]));
}
function getSymbols() {
	return read("cmudict.symbols").match(/^\S+$/gm);
}
function getVP() {
	return readPronunciations("cmudict.vp", /^(?<name>[^A-Z\s]+)(?<note>[^\s()]+)?(?:\((?<index>\d+)\))? (?<phonemes>(?:[A-Z]+[0-2]?(?: |$))+)/gim);
}
//#endregion
exports.ArticulationManner = ArticulationManner;
exports.Entry = Entry;
exports.Phoneme = Phoneme;
exports.Pronunciation = Pronunciation;
exports.getDict = getDict;
exports.getPhones = getPhones;
exports.getSymbols = getSymbols;
exports.getVP = getVP;

//# sourceMappingURL=index.cjs.map