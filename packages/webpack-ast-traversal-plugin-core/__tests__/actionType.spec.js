const actionTypes = require("../lib/actionType");

describe("Action Type", () => {

    it("should be defined", () => {
        expect(actionTypes).toBeDefined();
    });

    it("should contain all action types", () => {
        expect(actionTypes.IGNORE).toBe("ignore");
        expect(actionTypes.REMOVE).toBe("remove");
        expect(actionTypes.WARN).toBe("warn");
        expect(actionTypes.ERROR).toBe("error");
    });
});
