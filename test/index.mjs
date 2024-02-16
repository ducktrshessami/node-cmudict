import assert from "assert";
import { readFileSync } from "fs";
import * as cmudict from "../dist/index.mjs";

function lineCount(filename) {
    return readFileSync(new URL(`../dist/cmudict/${filename}`, import.meta.url), { encoding: "utf8" })
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

describe("ESM", function () {
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
});
