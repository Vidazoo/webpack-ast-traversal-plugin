const recast = require("recast");
const estraverse = require("estraverse");
const { RawSource } = require("webpack-sources");
const expressionNodeHandlers = require("./expressionNodeHandlers");
const { isJavaScriptAsset } = require("./utils");
const actionType = require("./actionType");
const ResultLogger = require("./ResultLogger");

function defaults(options) {
    return Object.assign({}, {
        ignoreComment: "@ast-traversal-ignore",
        callExpressions: [
            { identifier: "*.console.*", action: actionType.REMOVE },
            { identifier: "*.alert", action: actionType.REMOVE }
        ]
    }, options);
}

class BaseAstTraversalPlugin {

    constructor(options) {
        this.options = defaults(options);
    }

    apply(compiler) {
        throw new TypeError(`[${this.constructor.name}] apply method not implemented.`);
    }

    _optimizeChunkAssets(compilation, chunks, callback) {
        const files = [];

        chunks.forEach((chunk) => chunk.files.forEach(files.push));

        compilation.additionalChunkAssets.forEach(files.push);

        const result = ResultLogger.createWithCallback(callback);

        files.forEach((filename) => {
            const { removals, changes, errors, warnings } = this._handleCompilationAsset(compilation, filename);

            result
                .withErrors(errors)
                .withWarnings(warnings)
                .withRemovals(removals)
                .withChanges(changes);
        });

        result.flush();
    }

    _handleCompilationAsset(compilation, filename) {
        if (!isJavaScriptAsset(filename)) return;

        const options = this.options
            , source = compilation.assets[filename].source()
            , sourceAst = recast.parse(source);

        let handler;
        const removals = []
            , changes = []
            , errors = []
            , warnings = [];

        const traversedAst = estraverse.replace(sourceAst.program, {
            enter: function (node, parent) {
                if ((handler = expressionNodeHandlers[node.type])) {

                    const { action, result } = handler.handle(node, parent, options);

                    switch (action) {
                        case actionType.REMOVE:
                            this.remove();
                            removals.push({ filename, result, node });
                            break;
                        case actionType.CHANGE:
                            changes.push({ filename, result, node });
                            break;
                        case actionType.WARN:
                            errors.push({ filename, result, node });
                            break;
                        case actionType.ERROR:
                            warnings.push({ filename, result, node });
                            break;
                    }
                }
            }
        });

        this._astToCompilationAsset(traversedAst, compilation, filename);

        return { removals, errors, warnings };
    }

    _astToCompilationAsset(ast, compilation, filename) {
        compilation.assets[filename] = new RawSource(recast.print(ast).code);
    }
}

module.exports = BaseAstTraversalPlugin;