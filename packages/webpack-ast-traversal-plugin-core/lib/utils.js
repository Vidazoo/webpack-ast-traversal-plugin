const jsAssetRegExp = /\.(js|jsx)$/;

exports.isJavaScriptAsset = (filename) => jsAssetRegExp.test(filename);