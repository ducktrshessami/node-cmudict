const assert = require("assert");
const cmudict = require("../dist");
const { readFileSync } = require("fs");

function expectedPronunciationCount(filename) {
    return readFileSync(require.resolve(`cmudict/${filename}`), { encoding: "utf8" })
        .split("\n")
        .filter(line => line)
        .length;
}

function actualPronunciationCount(map) {
    let pronunciations = 0;
    for (const entry of map.values()) {
        pronunciations += entry.pronunciations.length;
    }
    return pronunciations;
}

it("Dict covers all lines", function () {
    assert.strictEqual(actualPronunciationCount(cmudict.Dict), expectedPronunciationCount("cmudict.dict"));
});

it("all phones' manners in ArticulationManner enum", function () {
    const manners = Object.values(cmudict.ArticulationManner);
    for (const manner of cmudict.Phones.values()) {
        assert(manners.includes(manner));
    }
});

it("VP covers all lines", function () {
    assert.strictEqual(actualPronunciationCount(cmudict.VP), expectedPronunciationCount("cmudict.vp"));
});
