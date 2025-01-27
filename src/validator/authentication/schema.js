const Joi = require("joi");

/**
 * Schema for validating login authentication payload.
 * @type {Joi.ObjectSchema}
 */
const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

/**
 * Schema for validating refresh token authentication payload.
 * @type {Joi.ObjectSchema}
 */
const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

/**
 * Schema for validating delete token authentication payload.
 * @type {Joi.ObjectSchema}
 */
const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
};
