import fs from 'fs';
import winston from 'winston';
import moment from 'moment';
import 'winston-daily-rotate-file';

const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss.SSS').trim();
const logDir = process.env.LOGGING_DIR || 'logs';
const logLevel = process.env.LOGGING_LEVEL || 'info';

// Create log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

/**
 * Create new winston logger instance.
 */
const logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            timestamp: tsFormat,
            level: logLevel,
            handleExceptions: true,
            //json: true,
            colorize: true,
            prettyPrint: true
        }),
        new winston.transports.DailyRotateFile({
            timestamp: tsFormat,
            filename: `${logDir}/ptis.log`,
            level: logLevel,
            maxsize: 1024 * 1024 * 10, // 10MB
            handleExceptions: true,

            //json: true,
            prettyPrint: true,
            //datePattern: 'YYYY-MM-DDTHH-mm'
        }),
        new winston.transports.File({
            timestamp: tsFormat,
            filename: `${logDir}/ptis.log`,
            level: logLevel,
            maxsize: 1024 * 1024 * 10, // 10MB
            handleExceptions: true,

            //json: true,
            prettyPrint: true,
            //datePattern: 'YYYY-MM-DDTHH-mm'
        })
    ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the mycode will be picked up by both transports (file and console)
        logger.info(message);
    }
};

export default logger;

