const httpStatusCodes = require('../utils/httpStatusCodes');
const BaseError = require('./baseError');

class Api404Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = '404 Not found.',
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = Api404Error;
