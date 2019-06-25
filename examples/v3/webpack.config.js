const webpack = require("webpack");
const path = require("path");
const context = path.resolve("src");
const WebpackAstTraversalPlugin = require("@vidazoo/webpack-ast-traversal-plugin-v3");

module.exports = {
    entry: "index.js",
    context: path.resolve("src"),
    resolve: {
        modules: ["node_modules", context],
        extensions: [".js"],
    },
    output: {
        filename: "build/index.js"
    },
    plugins: [
        new WebpackAstTraversalPlugin()
    ]
};