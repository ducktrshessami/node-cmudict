const assert = require("assert");
const cmudict = require("../dist");

it("all phones' manners in ArticulationManner enum", function () {
    const manners = Object.values(cmudict.ArticulationManner);
    for (const manner of cmudict.Phones.values()) {
        assert(manners.includes(manner));
    }
});
