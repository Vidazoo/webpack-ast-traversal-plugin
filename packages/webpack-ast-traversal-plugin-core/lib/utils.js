const jsAssetRegExp = /\.(js|jsx)$/;

exports.isJavaScriptAsset = (filename) => jsAssetRegExp.test(filename);

exports.ensureArray = (predicate = []) => Array.isArray(predicate) ? predicate : [predicate];

exports.clone = (predicate) => JSON.parse(JSON.stringify(predicate));