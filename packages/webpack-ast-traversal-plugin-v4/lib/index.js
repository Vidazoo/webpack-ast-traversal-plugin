class WebpackAstTraversalPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("WebpackAstTraversalPlugin", this._onEmit.bind(this));
    }

    _onEmit(compilation) {
        
    }
}

module.exports = WebpackAstTraversalPlugin;