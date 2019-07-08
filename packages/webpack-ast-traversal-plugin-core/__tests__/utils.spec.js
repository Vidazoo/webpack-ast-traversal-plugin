const utils = require("../lib/utils");

describe("Utils", () => {

    describe("isJavaScriptAsset", () => {

        it("should return 'true' on js file name", () => {
            expect(utils.isJavaScriptAsset("bundle.js")).toBe(true);
            expect(utils.isJavaScriptAsset("build/bundle.js")).toBe(true);
        });

        it("should return 'false' on non-js files", () => {
            expect(utils.isJavaScriptAsset("bundle.css")).toBe(false);
            expect(utils.isJavaScriptAsset("build/bundle.scss")).toBe(false);
        });
    });

    describe("ensureArray", () => {

        it("should return array from non-array object", () => {

            const fn = jest.fn();

            let array = utils.ensureArray(fn);

            array[0]();

            expect(array).toBeDefined();
            expect(array instanceof Array).toBe(true);
            expect(fn).toHaveBeenCalled();

            array = utils.ensureArray(array);

            expect(array instanceof Array).toBe(true);
            expect(typeof array[0] === "function").toBe(true);
        })
    });

    describe("clone", () => {

        const obj = {"test": 1};
        const obj2 = obj;
        const cloned = utils.clone(obj);

        expect(obj === obj2).toBe(true);
        expect(obj === cloned).toBe(false);
        expect(obj.test === cloned.test).toBe(true);
        expect(typeof cloned.test === "number").toBe(true);
    });

});
