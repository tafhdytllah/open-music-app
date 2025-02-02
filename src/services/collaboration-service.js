const { Pool } = require("pg");
const InvariantError = require("../exceptions/invariant-error");
const { nanoid } = require("nanoid");
const formatDateTime = require("../lib/date-time");

class CollaborationService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Verifies if a user is a collaborator for a specific playlist.
   * @param {string} playlistId - The ID of the playlist.
   * @param {string} userId - The ID of the user to verify.
   * @returns {Promise<void>} A promise that resolves if the user is a collaborator.
   * @throws {AuthorizationError} If the user is not a collaborator.
   */
  async verifyCollaborator(playlistId, userId) {
    const query = {
      text: "select * from collaborations where playlist_id = $1 and user_id = $2",
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError("Kolaborasi gagal diverifikasi");
    }
  }

  /**
   * Adds a new collaboration.
   * @param {string} playlistId - The ID of the playlist.
   * @param {string} userId - The ID of the user to add as a collaborator.
   * @returns {Promise<string>} A promise that resolves to the ID of the new collaboration.
   * @throws {InvariantError} If the collaboration could not be added.
   */
  async addCollaboration(playlistId, userId) {
    const id = `collaboration-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO collaborations VALUES($1, $2, $3, $4, $4) RETURNING id",
      values: [id, playlistId, userId, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("Kolaborasi gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  /**
   * Deletes a collaboration.
   * @param {string} playlistId - The ID of the playlist.
   * @param {string} userId - The ID of the user to remove as a collaborator.
   * @returns {Promise<void>} A promise that resolves when the collaboration is deleted.
   * @throws {InvariantError} If the collaboration could not be deleted.
   */
  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: "DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id",
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("Kolaborasi gagal dihapus");
    }
  }
}

module.exports = CollaborationService;
