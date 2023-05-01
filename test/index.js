const assert = require("assert");
const cmudict = require("../dist");
const { readFileSync } = require("fs");

function lineCount(filename) {
    return readFileSync(require.resolve(`cmudict/${filename}`), { encoding: "utf8" })
        .split("\n")
        .filter(line => line)
        .length;
}

function pronunciationCount(map) {
    let pronunciations = 0;
    for (const entry of map.values()) {
        pronunciations += entry.pronunciations.length;
    }
    return pronunciations;
}

it("Dict covers all lines", function () {
    assert.strictEqual(pronunciationCount(cmudict.Dict), lineCount("cmudict.dict"));
});

it("all phones' manners in ArticulationManner enum", function () {
    const manners = Object.values(cmudict.ArticulationManner);
    for (const manner of cmudict.Phones.values()) {
        assert(manners.includes(manner));
    }
});

it("Phones covers all lines", function () {
    assert.strictEqual(cmudict.Phones.size, lineCount("cmudict.phones"));
});

it("Symbols covers all lines", function () {
    assert.strictEqual(cmudict.Symbols.length, lineCount("cmudict.symbols"));
});

it("VP covers all lines", function () {
    assert.strictEqual(pronunciationCount(cmudict.VP), lineCount("cmudict.vp"));
});
