const Joi = require('joi');

const schemas = {
  userPOST: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    age: Joi.number().integer().min(18).max(120).required()
}),

};

module.exports = schemas;