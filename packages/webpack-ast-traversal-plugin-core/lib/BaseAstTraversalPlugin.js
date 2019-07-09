const recast = require("recast")
    , estraverse = require("estraverse")
    , {RawSource} = require("webpack-sources")
    , expressionNodeHandlers = require("./expressionNodeHandlers")
    , {isJavaScriptAsset} = require("./utils")
    , actionType = require("./actionType")
    , ResultLogger = require("./ResultLogger");

function defaults(options) {
    return Object.assign({}, {
        ignoreComment: "@ast-traversal-ignore",
        action: actionType.WARN,
        callExpressions: [
            {identifier: "*.console.*", action: actionType.WARN},
            {identifier: "*.alert.*", action: actionType.ERROR}
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

    static get ActionType() {
        return actionType;
    }

    _optimizeChunkAssets(compilation, chunks, callback) {
        const files = [];

        chunks.forEach((chunk) => {
            chunk.files.forEach((file) => files.push(file));
        });

        compilation.additionalChunkAssets.forEach((file) => files.push(file));

        const result = ResultLogger.createWithCallback(callback);

        files.forEach((filename) => this._handleCompilationAsset(compilation, filename, result));

        result.flushOutput();
    }

    _handleCompilationAsset(compilation, filename, logger) {
        if (!isJavaScriptAsset(filename)) return;

        const options = this.options
            , source = compilation.assets[filename].source()
            , sourceAst = recast.parse(source);

        let handler;

        const traversedAst = estraverse.replace(sourceAst.program, {
            enter: function (node, parent) {

                if ((handler = expressionNodeHandlers[node.type])) {

                    const results = handler.handle(node, parent, options);

                    results.forEach(({action, result}) => {
                        switch (action) {
                            case actionType.REMOVE:
                                this.remove();

                                if (parent.type === "LogicalExpression") {
                                    parent.operator = "";
                                }

                                logger.withRemovals({filename, result, node});
                                break;
                            case actionType.WARN:
                                logger.withWarnings({filename, result, node});
                                break;
                            case actionType.ERROR:
                                logger.withErrors({filename, result, node});
                                break;
                        }
                    });
                }
            }
        });

        compilation.assets[filename] = new RawSource(recast.print(traversedAst).code);
    }
}

module.exports = BaseAstTraversalPlugin;
