const errorFormatter = require("./formatters/errorFormatter")
    , warningFormatter = require("./formatters/warningFormatter")
    , removalFormatter = require("./formatters/removalFormatter")
    , utils = require("./utils")
    , log = require("webpack-log");

class ResultLogger {

    constructor(callback) {
        this._callback = callback;
        this._errors = [];
        this._warnings = [];
        this._removals = [];
        this._logger = log({name: "AST Traversal", level: "info"});
    }

    static createWithCallback(callback) {
        return new ResultLogger(callback);
    }

    withErrors(errors = []) {
        errors = utils.ensureArray(errors);

        this._errors.push(...errors);

        return this;
    }

    withWarnings(warnings = []) {
        warnings = utils.ensureArray(warnings);

        this._warnings.push(...warnings);

        return this;
    }

    withRemovals(removals = []) {
        removals = utils.ensureArray(removals);

        this._removals.push(...removals);

        return this;
    }

    flushOutput() {

        let error;

        if (this._warnings.length) {
            this._warnings.map((warning) => this._logger.warn(warningFormatter(warning)));
            this._warnings.length = 0;
        }

        if (this._removals.length) {
            this._removals.map((removal) => this._logger.info(removalFormatter(removal)));
            this._removals.length = 0;
        }

        if (this._errors.length) {
            this._errors.map((error) => this._logger.error(errorFormatter(error)));
            this._errors.length = 0;

            error = new Error();
        }

        this._callback(error);
    }
}

module.exports = ResultLogger;
