const InvariantError = require("../../exceptions/invariant-error");
const { UploadAlbumCoverSchema } = require("./schema");

const UploadValidator = {
  validateUploadAlbumCoverPayload: (headers) => {
    const validationResult = UploadAlbumCoverSchema.validate(headers);

    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );

      throw new InvariantError(errorMessage);
    }
  },
};

module.exports = UploadValidator;
