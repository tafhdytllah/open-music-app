const { Pool } = require("pg");
const InvariantError = require("../exceptions/invariant-error");

class AuthenticationService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Adds a refresh token to the database.
   * @param {string} token - The refresh token to add.
   * @returns {Promise<void>} A promise that resolves when the token is added.
   */
  async addRefreshToken(token) {
    const query = {
      text: "INSERT INTO authentications VALUES($1)",
      values: [token],
    };

    await this._pool.query(query);
  }

  /**
   * Verifies if a refresh token exists in the database.
   * @param {string} token - The refresh token to verify.
   * @returns {Promise<void>} A promise that resolves if the token is valid.
   * @throws {InvariantError} If the token is not found.
   */
  async verifyRefreshToken(token) {
    const query = {
      text: "SELECT token FROM authentications WHERE token = $1",
      values: [token],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError("Refresh token tidak valid");
    }
  }

  /**
   * Deletes a refresh token from the database.
   * @param {string} token - The refresh token to delete.
   * @returns {Promise<void>} A promise that resolves when the token is deleted.
   * @throws {InvariantError} If the token is not found.
   */
  async deleteRefreshToken(token) {
    const query = {
      text: "DELETE FROM authentications WHERE token = $1",
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationService;
