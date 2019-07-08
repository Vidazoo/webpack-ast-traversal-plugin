const chalk = require("chalk").default;

module.exports = ({ filename, result, node }) => {
    return chalk.yellow(`* AST traversal Warning - ${filename} Line: ${node.loc.start.line} Column: ${node.loc.start.column} - ${result.message}`);
};
