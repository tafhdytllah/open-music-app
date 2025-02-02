const Jwt = require("@hapi/jwt");
const InvariantError = require("../exceptions/invariant-error");
const config = require("../utils/config");

const TokenManager = {
  /**
   * Generates an access token.
   * @param {Object} payload - The payload to encode in the token.
   * @returns {string} The generated access token.
   */
  generateAccessToken: (payload) =>
    Jwt.token.generate(payload, config.jwt.access.key),
  /**
   * Generates a refresh token.
   * @param {Object} payload - The payload to encode in the token.
   * @returns {string} The generated refresh token.
   */
  generateRefreshToken: (payload) =>
    Jwt.token.generate(payload, config.jwt.refresh.key),
  /**
   * Verifies the refresh token.
   * @param {string} refreshToken - The refresh token to verify.
   * @returns {Object} The decoded payload of the refresh token.
   * @throws {InvariantError} If the refresh token is invalid.
   */
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verify(artifacts, config.jwt.refresh.key);
      return artifacts.decoded.payload;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw new InvariantError("Refresh token tidak valid");
    }
  },
};

module.exports = TokenManager;
