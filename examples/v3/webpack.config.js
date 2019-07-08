const path = require("path");
const context = path.resolve("src");
const WebpackAstTraversalPlugin = require("@vidazoo/webpack-ast-traversal-plugin-v3");
const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
    entry: {
        common: "common.js",
        app: "index.js"
    },
    context: path.resolve("src"),
    resolve: {
        modules: ["node_modules", context],
        extensions: [".js"],
    },
    output: {
        filename: "build/[name].js"
    },
    plugins: [
        new WebpackAstTraversalPlugin(),

        new JavaScriptObfuscator({
            compact: true,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            domainLock: [],
            identifierNamesGenerator: 'hexadecimal',
            identifiersPrefix: 'v',
            log: false,
            renameGlobals: true,
            reservedNames: ["^createPlayer", "^vidazoo", "defineProperty", "prototype"],
            reservedStrings: ["__esModule", "prototype"],
            seed: 0,
            selfDefending: false,
            sourceMap: false,
            sourceMapBaseUrl: '',
            sourceMapFileName: '',
            sourceMapMode: 'separate',
            rotateStringArray: false,
            stringArray: true,
            stringArrayEncoding: true,
            stringArrayThreshold: 1,
            target: 'browser',
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        })
    ]
};
