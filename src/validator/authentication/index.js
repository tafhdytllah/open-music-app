const InvariantError = require("../../exceptions/invariant-error");
const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require("./schema");

const AuthenticationValidator = {
  /**
   * Validates the login authentication payload.
   * @param {Object} payload - The payload to validate.
   * @throws {InvariantError} If the payload is invalid.
   */
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
  /**
   * Validates the refresh token authentication payload.
   * @param {Object} payload - The payload to validate.
   * @throws {InvariantError} If the payload is invalid.
   */
  validatePutAuthenticationPayload: (payload) => {
    const validationResult = PutAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
  /**
   * Validates the delete token authentication payload.
   * @param {Object} payload - The payload to validate.
   * @throws {InvariantError} If the payload is invalid.
   */
  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult =
      DeleteAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
};

module.exports = AuthenticationValidator;
