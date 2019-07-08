const _module = require("../lib/index");

describe("Module", () => {

    it("should export BaseAstTraversalPlugin", () => {
        expect(_module.BaseAstTraversalPlugin).toBeDefined();
        expect(_module.BaseAstTraversalPlugin.name).toBe("BaseAstTraversalPlugin");
    });

});
