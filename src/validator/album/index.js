const InvariantError = require("../../exceptions/invariant-error");
const { AlbumPayloadSchema } = require("./schema");

/**
 * @typedef {import('./schema').AlbumPayloadSchema} AlbumPayloadSchema
 */
const AlbumValidator = {
  /**
   * @param {AlbumPayloadSchema} payload
   */
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
};

module.exports = AlbumValidator;
