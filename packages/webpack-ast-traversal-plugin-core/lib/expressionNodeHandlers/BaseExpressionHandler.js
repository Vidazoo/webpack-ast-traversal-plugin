class BaseExpressionNodeHandler {

    shouldIgnoreNodeByComment(node, ignoreComment) {
        if (node.comments) {
            return !!node.comments.find((comment) => {
                return comment.leading && comment.value.trim() === ignoreComment;
            });
        }

        return false;
    }
}

module.exports = BaseExpressionNodeHandler;