const Joi = require("joi");

/**
 * Schema for Playlist Payload
 */
const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

/**
 * Schema for Add Song to Playlist Payload
 */
const PlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PlaylistPayloadSchema, PlaylistSongPayloadSchema };
