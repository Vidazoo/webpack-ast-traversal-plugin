const errorFormatter = require("../lib/formatters/errorFormatter");
const warningFormatter = require("../lib/formatters/warningFormatter");
const removalFormatter = require("../lib/formatters/removalFormatter");

describe("Formatters", () => {

    let node;

    beforeEach(() => {
        node = {
            loc: {
                start: {line: 2, column: 5}
            }
        };
    });

    describe("errorFormatter", () => {

        it("should format error message", () => {
            const error = errorFormatter({filename: "bundle.js", result: {message: "this is an error message"}, node});

            expect(error).toBeDefined();
            expect(error).toEqual(expect.stringContaining("bundle.js"));
            expect(error).toEqual(expect.stringContaining("this is an error message"));
            expect(error).toEqual(expect.stringContaining("* AST traversal Error"));
        });
    });

    describe("warningFormatter", () => {

        it("should format warning message", () => {
            const warning = warningFormatter({filename: "bundle.js", result: {message: "this is a warning message"}, node});

            expect(warning).toBeDefined();
            expect(warning).toEqual(expect.stringContaining("bundle.js"));
            expect(warning).toEqual(expect.stringContaining("this is a warning message"));
            expect(warning).toEqual(expect.stringContaining("* AST traversal Warning"));
        });
    });

    describe("removalFormatter", () => {

        it("should format warning message", () => {
            const removal = removalFormatter({filename: "bundle.js", result: {message: "this is a removal message"}, node});

            expect(removal).toBeDefined();
            expect(removal).toEqual(expect.stringContaining("bundle.js"));
            expect(removal).toEqual(expect.stringContaining("this is a removal message"));
            expect(removal).toEqual(expect.stringContaining("* AST traversal Remove"));
        });
    });

});
