const Joi = require("joi");

/**
 * Schema for validating collaboration payload.
 * @type {Joi.ObjectSchema}
 */
const CollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { CollaborationPayloadSchema };
