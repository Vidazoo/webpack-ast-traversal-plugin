const { BaseAstTraversalPlugin } = require("@vidazoo/webpack-ast-traversal-plugin-core");

class WebpackAstTraversalPlugin extends BaseAstTraversalPlugin {
    apply(compiler) {
        compiler
            .hooks
            .compilation
            .tap(this.constructor.name, (compilation) =>
                compilation
                    .hooks
                    .optimizeChunkAssets
                    .tapAsync(this.constructor.name, this._optimizeChunkAssets.bind(this, compilation)));
    }
}

module.exports = WebpackAstTraversalPlugin;