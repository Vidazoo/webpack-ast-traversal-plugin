const { BaseAstTraversalPlugin } = require("@vidazoo/webpack-ast-traversal-plugin-core");

class WebpackAstTraversalPlugin extends BaseAstTraversalPlugin {
    apply(compiler) {
        compiler.plugin("emit", this._onEmit.bind(this));
    }
}

module.exports = WebpackAstTraversalPlugin;