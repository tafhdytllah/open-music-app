const { Pool } = require("pg");

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
    console.log("addRefreshToken");
    const query = {
      text: "INSERT INTO authentications VALUES($1)",
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationService;
