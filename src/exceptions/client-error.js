/**
 * Represents a client error.
 * @extends Error
 */
class ClientError extends Error {
  /**
   * Creates an instance of ClientError.
   * @param {string} message - The error message.
   * @param {number} [statusCode=400] - The HTTP status code.
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ClientError";
  }
}

module.exports = ClientError;
