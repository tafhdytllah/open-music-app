const ClientError = require("./client-error");

/**
 * Represents an authentication error.
 * @extends ClientError
 */
class AuthenticationError extends ClientError {
  /**
   * Creates an instance of AuthenticationError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

module.exports = AuthenticationError;
