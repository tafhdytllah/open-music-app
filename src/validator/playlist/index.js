const InvariantError = require("../../exceptions/invariant-error");
const {
  PlaylistPayloadSchema,
  PlaylistSongPayloadSchema,
  PlaylistDeleteSongPayloadSchema,
} = require("./schema");

/**
 * @typedef {import('./schema').PlaylistPayloadSchema} PlaylistPayloadSchema
 * @typedef {import('./schema').PlaylistSongPayloadSchema} PlaylistSongPayloadSchema
 * @typedef {import('./schema').PlaylistDeleteSongPayloadSchema} PlaylistDeleteSongPayloadSchema
 */
const PlaylistValidator = {
  /**
   * @param {PlaylistPayloadSchema} payload
   */
  validatePostPlaylistPayload: (payload) => {
    const validationResult = PlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
  /**
   * @param {PlaylistSongPayloadSchema} payload
   */
  validatePostSongToPlaylistPayload: (payload) => {
    const validationResult = PlaylistSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
  /**
   * @param {PlaylistDeleteSongPayloadSchema} payload
   */
  validateDeleteSongFromPlaylistPayload: (payload) => {
    const validationResult = PlaylistDeleteSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
};

module.exports = PlaylistValidator;
