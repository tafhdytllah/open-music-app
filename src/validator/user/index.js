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
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
};

module.exports = UserValidator;
