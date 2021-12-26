const Joi = require('joi');

const recordRequest = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  minCount: Joi.number().required(),
  maxCount: Joi.number().greater(Joi.ref('minCount')).required(),
});

module.exports = { recordRequest };
