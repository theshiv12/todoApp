const Joi = require('joi');

exports.ValidationSource = {
  BODY: 'body',
  HEADER: 'headers',
  QUERY: 'query',
  PARAM: 'params',
};

exports.middleware = (schema, property = this.ValidationSource.BODY) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    const valid = error === undefined;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      console.log("error", message);

      res.status(422).json({
        error: message
      });
    }
  };
};

