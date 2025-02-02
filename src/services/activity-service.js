const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const formatDateTime = require("../lib/date-time");
const InvariantError = require("../exceptions/invariant-error");

class ActivityService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Records an activity in the playlist.
   * @param {string} playlistId - The ID of the playlist.
   * @param {string} songId - The ID of the song involved in the activity.
   * @param {string} credentialId - The ID of the user performing the activity.
   * @param {string} action - The action performed (e.g., 'ADD', 'DELETE').
   * @returns {Promise<void>} A promise that resolves when the activity is recorded.
   * @throws {InvariantError} If the activity could not be recorded.
   */
  async recordActivity(playlistId, songId, credentialId, action) {
    const id = `activity-${nanoid(16)}`;
    const time = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO playlist_song_activities VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, playlistId, songId, credentialId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("Failed to record activity");
    }
  }

  /**
   * Retrieves activity records for a playlist.
   * @param {string} playlistId - The ID of the playlist.
   * @returns {Promise<Object[]>} A promise that resolves to an array of activity records.
   */
  async getActivityRecordPlaylist(playlistId) {
    const query = {
      text: "SELECT u.username, s.title, psa.action, psa.time FROM playlist_song_activities AS psa LEFT JOIN users AS u ON u.id = psa.user_id LEFT JOIN songs AS s ON s.id = psa.song_id WHERE psa.playlist_id = $1",
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("Gagal mendapatkan activity record playlist");
    }

    return result.rows;
  }
}

module.exports = ActivityService;
