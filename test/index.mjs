import assert from "assert";
import { readFileSync } from "fs";
import * as cmudict from "../dist/index.mjs";

function lineCount(filename) {
    return readFileSync(new URL(`../cmudict/${filename}`, import.meta.url), { encoding: "utf8" })
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
    let Dict, Phones, Symbols, VP;
    before("reading all cmudict features", function () {
        Dict = cmudict.getDict();
        Phones = cmudict.getPhones();
        Symbols = cmudict.getSymbols();
        VP = cmudict.getVP();
    });

    it("Dict covers all lines", function () {
        assert.strictEqual(pronunciationCount(Dict), lineCount("cmudict.dict"));
    });

    it("all phones' manners in ArticulationManner enum", function () {
        const manners = Object.values(cmudict.ArticulationManner);
        for (const manner of Phones.values()) {
            assert(manners.includes(manner));
        }
    });

    it("Phones covers all lines", function () {
        assert.strictEqual(Phones.size, lineCount("cmudict.phones"));
    });

    it("Symbols covers all lines", function () {
        assert.strictEqual(Symbols.length, lineCount("cmudict.symbols"));
    });

    it("VP covers all lines", function () {
        assert.strictEqual(pronunciationCount(VP), lineCount("cmudict.vp"));
    });
});
