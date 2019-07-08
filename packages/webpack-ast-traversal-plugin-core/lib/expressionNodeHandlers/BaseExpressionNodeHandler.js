const actionType = require("../actionType");

class BaseExpressionNodeHandler {

    handle(node, parent, options) {
        if (
            this._shouldIgnoreNodeByIgnoreComment(node, options.ignoreComment) ||
            this._shouldIgnoreNodeByIgnoreComment(parent, options.ignoreComment)
        ) {
            return [this._createResponse(actionType.IGNORE, null)];
        }

        return this._handle(node, parent, options);
    }

    _handle(node, parent, options) {
        throw new TypeError(`[${this.constructor.name}] _handle method not implemented.`);
    }

    _shouldIgnoreNodeByIgnoreComment(node, ignoreComment) {
        if (node.comments) {
            return !!node.comments.find((comment) => {
                return comment.leading && comment.value.trim() === ignoreComment;
            });
        }

        return false;
    }

    _createResponse(action, result) {
        return {action, result};
    }
}

module.exports = BaseExpressionNodeHandler;
