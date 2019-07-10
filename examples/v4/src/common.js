exports.log = function log(type) {

    console[type].apply(console, arguments);
};
