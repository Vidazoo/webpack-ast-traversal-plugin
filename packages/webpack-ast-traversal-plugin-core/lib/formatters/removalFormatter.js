const chalk = require("chalk").default;

module.exports = ({ filename, result, node }) => {
    return chalk.cyan(`* AST traversal Remove - ${filename} Line: ${node.loc.start.line} Column: ${node.loc.start.column} - ${result.message}`);
};
