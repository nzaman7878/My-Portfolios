const winston = require('winston');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    // Output all logs to console. In production, this will be structured JSON.
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'production' 
        ? winston.format.json()
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(
              info => `${info.timestamp} ${info.level}: ${info.message}`
            )
          )
    })
  ]
});

// Create a stream object for Morgan or direct HTTP logging
logger.stream = {
  write: (message) => {
    // Trim to remove extra newlines inserted by morgan/express
    logger.info(message.trim());
  }
};

module.exports = logger;
