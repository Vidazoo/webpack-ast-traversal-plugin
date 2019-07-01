const chalk = require("chalk").default;

module.exports = ({ filename, result, node }) => {
    return chalk.red(`* AST traversal Error\r\n@${filename} Line: ${node.loc.start.line} Column: ${node.loc.start.column}\r\n- ${result.message}`);
}