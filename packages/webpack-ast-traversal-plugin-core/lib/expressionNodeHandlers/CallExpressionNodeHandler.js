const BaseExpressionNodeHandler = require("./BaseExpressionNodeHandler");
const actionType = require("../actionType");

class CallExpressionNodeHandler extends BaseExpressionNodeHandler {

    static get TYPE() {
        return "CallExpression";
    }

    _handle(node, parent, options) {

        let expression;
        for (let i = 0, len = options.callExpressions.length; i < len; i++) {
            expression = options.callExpressions[i];
            identifier = expression.identifier.split(".");

            const path = [];
            
        }

        // TODO: implement call expression handler

        // && (node.callee.object && node.callee.object.name === 'console')
        // && (node.callee.property /* && shouldRemove(node.callee.property.name) */))

        // if (parent.type === "LogicalExpression") {
        //     parent.operator = "";
        // }

    }
}

module.exports = CallExpressionNodeHandler;