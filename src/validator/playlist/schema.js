const Joi = require("joi");

/**
 * Schema for Playlist Payload
 */
const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { PlaylistPayloadSchema };
