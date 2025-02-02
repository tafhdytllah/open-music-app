const Joi = require("joi");

/**
 * Schema for User Payload
 */
const UserPayloadSchema = Joi.object({
  username: Joi.string().max(50).required(), // perlu ada di setiap variable
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
