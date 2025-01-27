const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const formatDateTime = require("../lib/date-time");
const InvariantError = require("../exceptions/invariant-error");

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Creates a new playlist.
   * @param {Object} param0 - The playlist details.
   * @param {string} param0.name - The name of the playlist.
   * @param {string} param0.credentialId - The ID of the user who owns the playlist.
   * @returns {Promise<string>} The ID of the newly created playlist.
   * @throws {InvariantError} If the playlist could not be created.
   */
  async createPlaylist({ name, credentialId }) {
    const id = `playlist-${nanoid(16)}`;
    const created_at = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO playlists(id, name, owner, created_at, updated_at) VALUES($1, $2, $3, $4, $4) RETURNING id",
      values: [id, name, credentialId, created_at],
    };

    const result = await this._pool.query(query);
    if (result.rows.length === 0) {
      throw new InvariantError("Failed to create playlist");
    }

    return result.rows[0].id;
  }
}

module.exports = PlaylistService;
