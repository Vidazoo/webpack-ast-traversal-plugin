const BaseExpressionHandler = require("./BaseExpressionHandler");

class CallExpressionHandler extends BaseExpressionHandler {
    shouldRemoveNode(node, parent, options) {
        if (this.shouldIgnoreNodeByComment(node, options.ignoreComment)) {
            return false;
        }

        // TODO: implement call expression removeal here
    }
}

module.exports = new CallExpressionHandler();