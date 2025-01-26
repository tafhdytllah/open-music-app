const InvariantError = require("../../exceptions/invariant-error");
const { SongPayloadSchema, SongQuerySchema } = require("./schema");

const SongValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
  validateSongQuery: (query) => {
    const validationResult = SongQuerySchema.validate(query);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
};

module.exports = SongValidator;
