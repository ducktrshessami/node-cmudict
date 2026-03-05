import { readFileSync } from "fs";
import { join } from "path";
import { beforeAll, describe, expect, it } from "vitest";
import * as cmudict from "../";

function lineCount(filename: string) {
    return readFileSync(join(__dirname, "../cmudict", filename), { encoding: "utf8" })
        .split("\n")
        .filter(line => line)
        .length;
}

function pronunciationCount(map: Map<string, cmudict.Entry>) {
    let pronunciations = 0;
    for (const entry of map.values()) {
        pronunciations += entry.pronunciations.length;
    }
    return pronunciations;
}

describe("parsing", function () {
    let Dict: Map<string, cmudict.Entry>;
    let Phones: Map<string, cmudict.ArticulationManner>;
    let Symbols: string[];
    let VP: Map<string, cmudict.Entry>;
    beforeAll(function () {
        Dict = cmudict.getDict();
        Phones = cmudict.getPhones();
        Symbols = cmudict.getSymbols();
        VP = cmudict.getVP();
    });

    it("Dict covers all lines", function () {
        expect(pronunciationCount(Dict)).toStrictEqual(lineCount("cmudict.dict"));
    });

    it("all phones' manners in ArticulationManner enum", function () {
        const manners = Object.values(cmudict.ArticulationManner);
        for (const manner of Phones.values()) {
            expect(manners).toContain(manner);
        }
    });

    it("Phones covers all lines", function () {
        expect(Phones.size).toStrictEqual(lineCount("cmudict.phones"));
    });

    it("Symbols covers all lines", function () {
        expect(Symbols.length).toStrictEqual(lineCount("cmudict.symbols"));
    });

    it("VP covers all lines", function () {
        expect(pronunciationCount(VP)).toStrictEqual(lineCount("cmudict.vp"));
    });
});
