const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const formatDateTime = require("../lib/date-time");
const InvariantError = require("../exceptions/invariant-error");
const AuthenticationError = require("../exceptions/authentication-error");
const NotFoundError = require("../exceptions/not-found-error");

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Adds a new user to the database.
   * @param {Object} param - The user details.
   * @param {string} param.username - The username of the user.
   * @param {string} param.password - The password of the user.
   * @param {string} param.fullname - The full name of the user.
   * @returns {Promise<string>} The ID of the newly created user.
   * @throws {InvariantError} If the username is already taken.
   */
  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5, $5) RETURNING id",
      values: [id, username, hashedPassword, fullname, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("Gagal menambahkan user. Mohon coba lagi.");
    }

    return result.rows[0].id;
  }

  /**
   * Verifies if the username is new and not already taken.
   * @param {string} username - The username to verify.
   * @throws {InvariantError} If the username is already taken.
   */
  async verifyNewUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 0) {
      throw new InvariantError(
        "Gagal menambahkan user. Username sudah digunakan.",
      );
    }
  }

  /**
   * Verifies the user's credentials.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} The ID of the user if the credentials are valid.
   * @throws {AuthenticationError} If the credentials are invalid.
   */
  async verifyUserCredential(username, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new AuthenticationError("Kredensial yang Anda berikan salah");
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Kredensial yang Anda berikan salah");
    }

    return id;
  }

  /**
   * Verifies if a user exists by their ID.
   * @param {string} userId - The ID of the user to verify.
   * @returns {Promise<void>} A promise that resolves if the user exists.
   * @throws {NotFoundError} If the user is not found.
   */
  async verifyUserExists(userId) {
    const query = {
      text: "SELECT id FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("User tidak ditemukan");
    }
  }
}

module.exports = UserService;
