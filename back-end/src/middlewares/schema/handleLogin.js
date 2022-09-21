const Joi = require('joi');

module.exports = Joi.object({
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
