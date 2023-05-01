const assert = require("assert");
const { ArticulationManner, Phones } = require("../dist");

describe("phone", function () {
    it("all phones' manners in ArticulationManner enum", function () {
        const manners = Object.values(ArticulationManner);
        for (const phone of Phones.values()) {
            assert(manners.includes(phone.manner));
        }
    });
});
