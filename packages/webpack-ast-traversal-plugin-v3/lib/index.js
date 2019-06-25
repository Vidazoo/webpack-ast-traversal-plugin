class WebpackAstTraversalPlugin {
    apply(compiler) {
        compiler.plugin("emit", this._onEmit.bind(this));
    }

    _onEmit(compilation, callback) {

        

        callback();
    }
}

module.exports = WebpackAstTraversalPlugin;