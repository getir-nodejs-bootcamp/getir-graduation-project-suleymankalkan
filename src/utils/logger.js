const { createLogger, format, transports } = require('winston');

const { combine, timestamp } = format;

const logger = createLogger({
  level: 'error',
  format: combine(format.json(), timestamp()),
  transports: [
    new transports.File({ filename: 'src/logs/error.log', level: 'error' }),
  ],
});

module.exports = logger;
