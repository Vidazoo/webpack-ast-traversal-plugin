class BaseExpressionHandler {
    shouldIgnoreNodeByComment(node, commentBlock) {
        if (node.comments) {
            return !!node.comments.find((comment) => {
                return comment.leading && comment.value.trim() === commentBlock;
            });
        }

        return false;
    }
}

module.exports = BaseExpressionHandler;