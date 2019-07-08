const chalk = require("chalk").default;

module.exports = ({ filename, result, node }) => {
    return chalk.red(`* AST traversal Error - ${filename} Line: ${node.loc.start.line} Column: ${node.loc.start.column} - ${result.message}`);
};
