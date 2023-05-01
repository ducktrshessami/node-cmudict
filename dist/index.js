"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ArticulationManner: () => ArticulationManner,
  Dict: () => Dict,
  Phones: () => Phones,
  Symbols: () => Symbols,
  VP: () => VP
});
module.exports = __toCommonJS(src_exports);

// src/phone.ts
var PhonePattern = new RegExp("^(?<phoneme>[A-Z]+)\\s+(?<manner>[A-Z]+)$", "gmi");
var ArticulationManner = /* @__PURE__ */ ((ArticulationManner2) => {
  ArticulationManner2["Stop"] = "stop";
  ArticulationManner2["Nasal"] = "nasal";
  ArticulationManner2["Fricative"] = "fricative";
  ArticulationManner2["Affricate"] = "affricate";
  ArticulationManner2["Liquid"] = "liquid";
  ArticulationManner2["Semivowel"] = "semivowel";
  ArticulationManner2["Vowel"] = "vowel";
  ArticulationManner2["Aspirate"] = "aspirate";
  return ArticulationManner2;
})(ArticulationManner || {});

// src/read.ts
var import_fs = require("fs");
function read(filename) {
  return (0, import_fs.readFileSync)(require.resolve(`cmudict/${filename}`), { encoding: "utf8" });
}

// src/entry.ts
var Entry = class {
  constructor(name, tags = []) {
    this.name = name;
    this.pronunciations = [];
    this.tags = new Set(tags);
  }
  addPronunciation(pronunciation, note) {
    const newItem = new Pronunciation(
      this,
      pronunciation,
      note
    );
    this.pronunciations.push(newItem);
    return newItem;
  }
  toString() {
    if (this.tags && this.pronunciations.length) {
      const first = this.pronunciations[0].toString() + ` # ${[...this.tags.values()].join(", ")}`;
      return [first, ...this.pronunciations.slice(1)].join("\n");
    } else {
      return this.pronunciations.join("\n");
    }
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
  constructor(entry, phonemes, note = null) {
    this.entry = entry;
    this.note = note;
    this.phonemes = phonemes.map((phoneme) => new Phoneme(phoneme));
  }
  toString() {
    return `${this.entry.name} ${this.phonemes.join(" ")}`;
  }
  toJSON() {
    const json = { phonemes: this.phonemes.map((phoneme) => phoneme.toString()) };
    if (this.note) {
      json.note = this.note;
    }
    return json;
  }
};
var _Phoneme = class {
  constructor(raw) {
    this.raw = raw;
    const match = raw.match(_Phoneme.Pattern);
    this.phoneme = match.groups.phoneme;
    this.stress = match.groups.stress ? parseInt(match.groups.stress) : null;
  }
  toString() {
    return this.raw;
  }
};
var Phoneme = _Phoneme;
Phoneme.Pattern = new RegExp("^(?<phoneme>[A-Z]+)(?<stress>[0-2])?$", "i");

// src/util.ts
function mapIt(it, fn) {
  const result = new Array();
  for (const value of it) {
    result.push(fn(value));
  }
  return result;
}
function readPronunciations(filename, pattern) {
  var _a, _b;
  const entries = /* @__PURE__ */ new Map();
  for (const match of read(filename).matchAll(pattern)) {
    const entry = (_a = entries.get(match.groups.name)) != null ? _a : new Entry(match.groups.name);
    (_b = match.groups.tags) == null ? void 0 : _b.split(", ").forEach((tag) => entry.tags.add(tag));
    entry.addPronunciation(match.groups.phonemes.split(" "), match.groups.note);
    entries.set(entry.name, entry);
  }
  return entries;
}

// src/index.ts
var WordPattern = new RegExp("^(?<name>[^\\s()]+)(?:\\((?<index>\\d+)\\))? (?<phonemes>(?:[A-Z]+[0-2]?(?:(?= #)| |$))+)(?: # (?<tags>(?:[^\\s,]+(?:, |$))+))?$", "gmi");
var Dict = readPronunciations("cmudict.dict", WordPattern);
var Phones = new Map(
  mapIt(
    read("cmudict.phones").matchAll(PhonePattern),
    (match) => [match[1], match[2]]
  )
);
var SymbolPattern = /^\S+$/gm;
var Symbols = read("cmudict.symbols").match(SymbolPattern);
var VPPattern = new RegExp("^(?<name>[^A-Z\\s]+)(?<note>[^\\s()]+)?(?:\\((?<index>\\d+)\\))? (?<phonemes>(?:[A-Z]+[0-2]?(?: |$))+)", "gmi");
var VP = readPronunciations("cmudict.vp", VPPattern);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArticulationManner,
  Dict,
  Phones,
  Symbols,
  VP
});
