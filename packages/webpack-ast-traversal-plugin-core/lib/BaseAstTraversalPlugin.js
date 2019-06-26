const recast = require("recast");
const estraverse = require("estraverse");
const { RawSource } = require("webpack-sources");
const expressionHandlers = require("./expressionHandlers");
const { isJavaScriptAsset } = require("./utils");

function defaults(options) {
    return Object.assign({}, {
        ignoreComment: "@ast-traversal-ignore",
        removeCallExpressions: [
            "console.*",
            "alert"
        ]
    }, options);
}

class BaseAstTraversalPlugin {

    constructor(options) {
        this.options = defaults(options);
    }

    _optimaizeChunkAssest(compilation, chunks, callback) {
        const files = [];

        chunks.forEach((chunk) => chunk.files.forEach((file) => files.push(file)));

        compilation.additionalChunkAssets.forEach((file) => files.push(file));

        files.forEach(this._handleCompilationAsset.bind(this, compilation));

        callback();
    }

    _handleCompilationAsset(compilation, filename) {
        if (!isJavaScriptAsset(filename)) return;

        const self = this
            , source = compilation.assets[filename].source()
            , sourceAst = recast.parse(source);

        let handler;

        const traversedAst = estraverse.replace(sourceAst.program, {
            enter: function (node, parent) {
                if (
                    (handler = expressionHandlers[node.type]) &&
                    handler.shouldRemoveNode(node, parent, self.options)
                ) {
                    this.remove();
                }
            }
        });

        this._astToCompilationAsset(traversedAst, compilation, filename);
    }

    _astToCompilationAsset(ast, compilation, filename) {
        compilation.assets[filename] = new RawSource(recast.print(ast).code);
    }
}

module.exports = BaseAstTraversalPlugin;