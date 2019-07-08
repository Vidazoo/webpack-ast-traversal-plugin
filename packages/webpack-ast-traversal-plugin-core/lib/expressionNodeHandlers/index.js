const CallExpressionNodeHandler = require("./CallExpressionNodeHandler");

module.exports = {
    [CallExpressionNodeHandler.TYPE]: new CallExpressionNodeHandler
};
