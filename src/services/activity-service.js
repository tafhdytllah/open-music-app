const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const formatDateTime = require("../lib/date-time");
const InvariantError = require("../exceptions/invariant-error");

class ActivityService {
  constructor() {
    this._pool = new Pool();
  }

  async recordActivity(playlistId, songId, credentialId, action) {
    const id = `activity-${nanoid(16)}`;
    const time = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO playlist_song_activities VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, playlistId, songId, credentialId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Failed to record activity");
    }
  }
}

module.exports = ActivityService;
