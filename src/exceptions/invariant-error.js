const ClientError = require("./client-error");

/**
 * Represents an invariant error.
 * @extends ClientError
 */
class InvariantError extends ClientError {
  /**
   * Creates an instance of InvariantError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = "InvariantError";
  }
}

module.exports = InvariantError;
