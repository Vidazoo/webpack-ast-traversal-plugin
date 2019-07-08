const BaseExpressionNodeHandler = require("./BaseExpressionNodeHandler")
    , utils = require("../utils");

class CallExpressionNodeHandler extends BaseExpressionNodeHandler {

    static get TYPE() {
        return "CallExpression";
    }

    _handle(node, parent, options) {
        const path = this._resolvePath(node)
            , results = [];

        let expression;
        for (let i = 0, len = options.callExpressions.length; i < len; i++) {
            expression = options.callExpressions[i];

            if (this._isPathMatchToIdendifier(path, expression.identifier)) {
                results.push(
                    this._createResponse(expression.action || options.action, {message: `expression identifier found - "${path.join(".")}" (${expression.identifier})`})
                );
            }
        }

        return results;
    }

    _resolvePath(node, path = []) {
        if (node) {
            switch (node.type) {
                case "CallExpression":
                    this._resolvePath(node.callee, path);
                    break;
                case "MemberExpression":
                    this._resolvePath(node.object, path);
                    this._resolvePath(node.property, path);
                    break;
                case "Identifier":
                    path.push(node.name);
                    break;
                case "Literal":
                    path.push(node.value);
                    break;
            }
        }

        return path;
    }

    _isPathMatchToIdendifier(path, identifier) {
        path = utils.clone(path).join(".");

        const anyPrefix = identifier.startsWith("*");
        const anySuffix = identifier.endsWith("*");

        identifier = identifier
            .split(".")
            .filter(id => id !== "*")
            .join(".");

        const indexOfIdentifier = path.indexOf(identifier);

        return !(

            // if the identifier is not present in the path
            indexOfIdentifier < 0 ||

            // if path must start with identifier
            indexOfIdentifier > 0 && !anyPrefix ||

            // if path must end with identifier
            !path.endsWith(identifier) && !anySuffix
        );
    }
}

module.exports = CallExpressionNodeHandler;
