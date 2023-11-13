const Joi = require('joi');

const registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .message('Password must be between 3 and 30 characters and contain only letters and numbers')
    .required(),
});

module.exports = registrationSchema;
