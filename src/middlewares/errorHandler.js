const BaseError = require('../errors/baseError');
const recordResponse = require('../utils/recordResponse');
const logger = require('../utils/logger');

function logError(err) {
  logger.log({ level: 'error', message: err });
}

function returnError(err, req, res) {
  logError(err);
  res.status(err.statusCode || 500).send(recordResponse(2, err.message));
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  returnError,
  isOperationalError,
};
