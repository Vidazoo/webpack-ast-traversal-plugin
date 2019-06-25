const recast = require("recast");
const estraverse = require("estraverse");

class BaseAstTraversalPlugin {
    constructor(options) {
        this.options = options;
    }

    _onEmit(compilation, callback) {
        compilation.chunks.forEach((chunk) => {
            chunk.files.forEach(this._handleCompilationAsset.bind(this));
        });

        callback && callback();
    }

    _handleCompilationAsset(compilation, filename) {
        let source = compilation.assets[filename].source();

        //source =  modify source here

        compilation.assets[filename] = this._createCompilationAsset(source);
    }

    _createCompilationAsset(source) {
        return {
            source: function () {
                return source;
            },
            size: function () {
                return source.length;
            }
        };
    }
}

module.exports = BaseAstTraversalPlugin;