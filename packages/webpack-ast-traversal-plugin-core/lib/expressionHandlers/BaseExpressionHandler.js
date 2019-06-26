class BaseExpressionHandler {
    
    apply(compiler) {
        throw new TypeError(`[${this.constructor.name}] apply method not implemented.`);
    }

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