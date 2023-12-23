const Joi = require('joi');

const schemas = {
  userLogin: Joi.object().keys({
    email: Joi.string().required(),
    password:Joi.string().required()
  }),
  userRegister: Joi.object().keys({
    name:Joi.string().required(),
    email: Joi.string().required(),
    password:Joi.string().required()
  }),

};

module.exports = schemas;