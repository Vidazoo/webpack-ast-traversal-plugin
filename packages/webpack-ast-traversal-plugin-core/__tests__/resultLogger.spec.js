const ResultLogger = require("../lib/ResultLogger");

describe("Result Logger", () => {

    let logger;

    beforeEach(() => {
        logger = new ResultLogger();
    });

    it("should be defined", () => {
        expect(ResultLogger).toBeDefined();
        expect(logger).toBeDefined();
    });

    it("should add errors", () => {

        const error = new Error("error");

        logger.withErrors(error);

        expect(logger._errors.length).toBe(1);
        expect(logger._errors[0] instanceof Error).toBe(true);
    });

    it("should add warnings", () => {

        const warning = "Attention!";

        logger.withWarnings(warning);

        expect(logger._warnings.length).toBe(1);
        expect(typeof logger._warnings[0]).toBe("string");
    });

    it("should add removals", () => {

        const removal = "remove this line!";

        logger.withRemovals(removal);

        expect(logger._removals.length).toBe(1);
        expect(typeof logger._removals[0]).toBe("string");
    });

    it("should create with callback", () => {

        const callback = jest.fn();

        logger = ResultLogger.createWithCallback(callback);

        logger.flushOutput();

        expect(callback).toHaveBeenCalled();

    });

    it("should call callback with error", () => {

        const callback = jest.fn();

        const node = {
            loc: {
                start: {line: 2, column: 5}
            }
        };

        logger = ResultLogger.createWithCallback(callback);

        logger.withErrors({node, result: {message: "error"}, action: "error", filename: "bundle.js"});

        logger.flushOutput();

        expect(logger.flushOutput).toThrow();

        expect(callback).toHaveBeenCalledWith(new Error);

    });
});
