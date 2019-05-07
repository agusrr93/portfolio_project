const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
      return  (req, res, next) => {
          const result = Joi.validate(req.body, schema)    
          if (result.error) {
              return res.status(400).json({
                  success: false,
                  message: "Email or Password is required"
              })
          }
          next();
      }
    },

    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}