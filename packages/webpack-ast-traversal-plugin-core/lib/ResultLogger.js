const errorFormatter = require("./formatters/errorFormatter");
const warningFormatter = require("./formatters/warningFormatter");
const changeFormatter = require("./formatters/changeFormatter");
const utils = require("./utils");

class ResultLogger {

    constructor(callback) {
        this._callback = callback;
        this._errors = [];
        this._warnings = [];
        this._removals = [];
        this._changes = [];
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

        this._removals.push(...warnings);

        return this;
    }

    withChanges(changes = []) {
        changes = utils.ensureArray(changes);

        this._changes.push(...changes);

        return this;
    }

    flush() {

        if (this._changes.length) {
            this._changes.map((change) => console.log(changeFormatter(change)));
        }

        if (this._warnings.length) {
            this._warnings.map((warning) => console.warn(warningFormatter(warning)));
        }

        let optionalError;

        if (this._errors.length) {
            optionalError = new Error(this._errors.map(errorFormatter).join("\r\n"));
        }

        this._callback(optionalError);
    }
}

module.exports = ResultLogger;