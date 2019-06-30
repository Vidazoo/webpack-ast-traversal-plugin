const BaseExpressionNodeHandler = require("./BaseExpressionNodeHandler");

class CallExpressionNodeHandler extends BaseExpressionNodeHandler {

    static get TYPE() {
        return "CallExpression";
    }

    shouldRemoveNode(node, parent, options) {
        if (this.shouldIgnoreNodeByComment(node, options.ignoreComment)) {
            return false;
        }

        // TODO: implement call expression removeal here

    }
}

module.exports = CallExpressionNodeHandler;