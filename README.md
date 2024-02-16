# node-cmudict
[cmusphinx/cmudict](https://github.com/cmusphinx/cmudict) wrapper

## Usage
```js
const {
    Entry,
    getDict,
    getPhones,
    getSymbols,
    getVP
} = require("node-cmudict");

// Read cmusphinx/cmudict
const Dict = getDict();
const Phones = getPhones();
const Symbols = getSymbols();
const VP = getVP();

// Get word pronunciation
const entry = Dict.get("syllables");
console.log(entry.pronunciations[0].phonemes.join(" ")); // S IH1 L AH0 B AH0 L Z

// Create new entry
const escyllis = new Entry("escyllis");
escyllis.addPronunciation(["EH0", "S", "IH1", "L", "IH1", "S"]);
Dict.set(escyllis.name, escyllis);

// Get phoneme articulation
console.log(Phones.get("SH")); // fricative

// Validate entry phonemes with Symbols list
console.log(escyllis.pronunciations[0].phonemes.every(phoneme => Symbols.includes(phoneme.raw))); // true

// Get symbol pronunciation
const ampersand = VP.get("&");
console.log(ampersand.pronunciations[0].note + ":", ampersand.pronunciations[0].phonemes.join(" ")); // ampersand: AE1 M P ER0 S AE2 N D
```
