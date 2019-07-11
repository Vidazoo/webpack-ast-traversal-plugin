const path = require("path");
const context = path.resolve("src");
const WebpackAstTraversalPlugin = require("@vidazoo/webpack-ast-traversal-plugin-v4");
const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
    mode: "production",
    context,
    entry: "index.js",
    resolve: {
        modules: ["node_modules", context],
        extensions: [".js"],
    },
    output: {
        path: path.resolve("build"),
        filename: "bundle.js"
    },
    plugins: [
        new WebpackAstTraversalPlugin({
            callExpressions: [
                { identifier: "*.console.*", action: WebpackAstTraversalPlugin.ActionType.WARN },
                { identifier: "*.alert.*", action: WebpackAstTraversalPlugin.ActionType.ERROR }
            ]
        }),

        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        })
    ]
};
