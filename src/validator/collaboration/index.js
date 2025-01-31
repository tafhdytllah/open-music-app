const InvariantError = require("../../exceptions/invariant-error");
const { CollaborationPayloadSchema } = require("./schema");

/**
 * @typedef {import('./schema').CollaborationPayloadSchema} CollaborationPayloadSchema
 */
const CollaborationValidator = {
  /**
   * @param {CollaborationPayloadSchema} payload
   */
  validateCollaborationPayload: (payload) => {
    const validationResult = CollaborationPayloadSchema.validate(payload);
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /"/g,
        "",
      );
      throw new InvariantError(errorMessage);
    }
  },
};

module.exports = CollaborationValidator;
