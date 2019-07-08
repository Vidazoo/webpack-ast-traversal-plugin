function Logger() { }

Logger.prototype.log = function () {

    console.log.apply(console, arguments);
};

Logger.prototype.error = function () {
    window.console.error.apply(console, arguments);
};

Logger.prototype.warn = function () {
    console.warn.apply(console, arguments);
};

module.exports = Logger;
