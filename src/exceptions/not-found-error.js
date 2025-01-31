const ClientError = require("./client-error");

/**
 * Represents a not found error.
 * @extends ClientError
 */
class NotFoundError extends ClientError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
