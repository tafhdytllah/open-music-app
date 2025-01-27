const InvariantError = require("../../exceptions/invariant-error");
const { PlaylistPayloadSchema } = require("./schema");

/**
 * @typedef {import('./schema').PlaylistPayloadSchema} PlaylistPayloadSchema
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
};

module.exports = PlaylistValidator;
