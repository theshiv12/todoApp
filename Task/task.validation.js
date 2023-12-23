const Joi = require('joi');

const schemas = {
  taskPOST: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().iso().required(),
    status: Joi.string().valid('pending', 'completed').default('pending'),
  }),

  taskGET: Joi.object().keys({
    taskId:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  }),

  taskPUT: Joi.object().keys({
    taskId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    title: Joi.string(),
    description: Joi.string(),
    dueDate: Joi.date().iso(),
    status: Joi.string().valid('pending', 'completed').default('pending'),
  }).min(1),
  
  taskDELETE: Joi.object().keys({
      taskId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required() 
    })

};

module.exports = schemas;