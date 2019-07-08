const { BaseAstTraversalPlugin } = require("@vidazoo/webpack-ast-traversal-plugin-core");

class WebpackAstTraversalPlugin extends BaseAstTraversalPlugin {
    apply(compiler) {
        compiler
            .plugin("compilation", (compilation) =>
                compilation
                    .plugin("optimize-chunk-assets", this._optimizeChunkAssets.bind(this, compilation)));
    }
}

module.exports = WebpackAstTraversalPlugin;
