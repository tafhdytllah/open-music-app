const InvariantError = require("../../exceptions/invariant-error");
const { UserPayloadSchema } = require("./schema");

/**
 * @typedef {import('./schema').UserPayloadSchema} UserPayloadSchema
 */
const UserValidator = {
  /**
   * @param {UserPayloadSchema} payload
   */
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UserValidator;
