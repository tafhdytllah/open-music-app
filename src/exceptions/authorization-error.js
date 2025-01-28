const ClientError = require("./client-error");

/**
 * Represents an authorization error.
 * @extends ClientError
 */
class AuthorizationError extends ClientError {
  /**
   * Creates an instance of AuthorizationError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 403);
    this.name = "AuthorizationError";
  }
}

module.exports = AuthorizationError;
