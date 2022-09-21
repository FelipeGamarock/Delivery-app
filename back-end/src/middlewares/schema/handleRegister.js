const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required().empty().min(12)
    .messages({
      'any.required': '400|"name" is required',
      'string.empty': '400|"name" is empty',
      'string.min': '400|"name" length must be at least 12 characters long',
    }),
  email: Joi.string().required().empty().email()
    .messages({
      'any.required': '400|"email" is required',
      'string.empty': '400|"email" is empty',
      'string.email': '400|"email" invalid email',
    }),
  password: Joi.string().required().empty().min(6)
    .messages({
      'any.required': '400|"password" is required',
      'string.empty': '400|"password" is empty',
      'string.min': '400|"password" length must be at least 6 characters long',
    }),
});
