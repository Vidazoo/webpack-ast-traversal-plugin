const Logger = require("./common");

const logger = new Logger();

(alert && alert(123));

logger.log("This is a test log");
logger.error("This is a test error");
logger.warn("This is a test warning");
