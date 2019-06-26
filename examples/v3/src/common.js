function Logger() { }

Logger.prototype.log = function () {
    //@ast-traversal-ignore
    console.log.apply(console, arguments);
};

Logger.prototype.error = function () {
    console.error.apply(console, arguments);
};

Logger.prototype.warn = function () {
    console.warn.apply(console, arguments);
};

module.exports = Logger;