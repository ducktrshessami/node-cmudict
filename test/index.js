const assert = require("assert");
const cmudict = require("../dist");
const { readFileSync } = require("fs");

it("Dict covers all lines", function () {
    const lines = readFileSync(require.resolve("cmudict/cmudict.dict"), "utf8")
        .split("\n")
        .filter(line => line);
    let pronunciations = 0;
    for (const entry of cmudict.Dict.values()) {
        pronunciations += entry.pronunciations.length;
    }
    assert.strictEqual(pronunciations, lines.length);
});

it("all phones' manners in ArticulationManner enum", function () {
    const manners = Object.values(cmudict.ArticulationManner);
    for (const manner of cmudict.Phones.values()) {
        assert(manners.includes(manner));
    }
});
