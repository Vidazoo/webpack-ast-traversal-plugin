class Logger {
    log() {
        // @ast-traversal-ignore
        console.log.apply(console, arguments);
    }

    error() {
        window.console.error.apply(console, arguments);
    }

    warn() {
        console.warn.apply(console, arguments);
    }
}

const logger = new Logger();

logger.log("This is a test log");
logger.error("This is a test error");
logger.warn("This is a test warning");
