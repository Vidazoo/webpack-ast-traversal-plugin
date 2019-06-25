const { BaseAstTraversalPlugin } = require("@vidazoo/webpack-ast-traversal-plugin-core");

class WebpackAstTraversalPlugin extends BaseAstTraversalPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("WebpackAstTraversalPlugin", this._onEmit.bind(this));
    }
}

module.exports = WebpackAstTraversalPlugin;