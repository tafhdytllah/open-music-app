const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const formatDateTime = require("../lib/date-time");
const InvariantError = require("../exceptions/invariant-error");
const NotFoundError = require("../exceptions/not-found-error");
const { mapSongDbtoSongModel } = require("../utils");

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Inserts a new song into the database.
   * @param {Object} param0 - The song details.
   * @param {string} param0.title - The title of the song.
   * @param {number} param0.year - The year of the song.
   * @param {string} param0.genre - The genre of the song.
   * @param {string} param0.performer - The performer of the song.
   * @param {number} [param0.duration] - The duration of the song.
   * @param {string} [param0.albumId] - The ID of the album the song belongs to.
   * @returns {Promise<string>} The ID of the newly created song.
   * @throws {InvariantError} If the album ID is invalid.
   */
  async insertSong({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());

    if (albumId !== undefined) {
      const findAlbumById = {
        text: "SELECT id FROM albums WHERE id = $1",
        values: [albumId],
      };

      const result = await this._pool.query(findAlbumById);

      if (!result.rowCount) {
        throw new NotFoundError(
          `Failed create new song, ${albumId} is not found`,
        );
      }
    }

    const query = {
      text: "INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING id",
      values: [id, albumId, title, year, genre, performer, duration, createdAt],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 1) {
      throw new InvariantError("Failed to create song");
    }

    return result.rows[0].id;
  }

  /**
   * Retrieves a list of all songs from the database.
   * @returns {Promise<Object[]>} A promise that resolves to an array of song objects.
   */
  async listSongs() {
    const result = await this._pool.query("SELECT * FROM songs");
    return result.rows.map(mapSongDbtoSongModel);
  }

  /**
   * Retrieves a song by its ID from the database.
   * @param {string} id - The ID of the song to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the song object.
   * @throws {NotFoundError} If the song is not found.
   */
  async getSongById(id) {
    const query = {
      text: "SELECT * FROM songs WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Song not found");
    }

    return result.rows[0];
  }

  /**
   * Updates a song by its ID in the database.
   * @param {string} id - The ID of the song to update.
   * @param {Object} param1 - The song details to update.
   * @param {string} param1.title - The title of the song.
   * @param {number} param1.year - The year of the song.
   * @param {string} param1.genre - The genre of the song.
   * @param {string} param1.performer - The performer of the song.
   * @param {number} [param1.duration] - The duration of the song.
   * @param {string} [param1.albumId] - The ID of the album the song belongs to.
   * @returns {Promise<void>} A promise that resolves when the song is updated.
   * @throws {NotFoundError} If the album ID is not found.
   */
  async updateSongById(
    id,
    { title, year, genre, performer, duration, albumId },
  ) {
    if (albumId !== undefined) {
      const findAlbumById = {
        text: "SELECT id FROM albums WHERE id = $1",
        values: [albumId],
      };

      const result = await this._pool.query(findAlbumById);

      if (!result.rowCount) {
        throw new NotFoundError(`Failed edit song, ${albumId} is not found`);
      }
    }

    const updatedAt = formatDateTime(new Date());

    const query = {
      text: "UPDATE songs SET album_id = $1, title = $2, year = $3, genre = $4, performer = $5, duration = $6, updated_at = $7 WHERE id = $8",
      values: [albumId, title, year, genre, performer, duration, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(`Failed edit song, ${id} is not found`);
    }
  }

  /**
   * Removes a song by its ID from the database.
   * @param {string} id - The ID of the song to remove.
   * @returns {Promise<void>} A promise that resolves when the song is removed.
   * @throws {NotFoundError} If the song is not found.
   */
  async removeSongById(id) {
    const query = {
      text: "DELETE FROM songs WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(`Failed delete song, ${id} is not found`);
    }
  }
}

module.exports = SongService;
