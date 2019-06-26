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
        filename: "index.js"
    },
    plugins: [
        new WebpackAstTraversalPlugin(),

        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        })
    ]
};