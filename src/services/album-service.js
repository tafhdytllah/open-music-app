const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../exceptions/invariant-error");
const formatDateTime = require("../lib/date-time");
const NotFoundError = require("../exceptions/not-found-error");
const { mapAlbumDbtoAlbumModel, mapSongDbtoSongModel } = require("../utils");

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Inserts a new album into the database.
   * @param {Object} param0 - The album details.
   * @param {string} param0.name - The name of the album.
   * @param {number} param0.year - The year of the album.
   * @returns {Promise<string>} The ID of the newly created album.
   * @throws {InvariantError} If the album could not be created.
   */
  async insertAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO albums VALUES($1, $2, $3, $4, $4) RETURNING id",
      values: [id, name, year, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new InvariantError("Failed to create album");
    }

    return result.rows[0].id;
  }

  /**
   * Finds an album by its ID in the database.
   * @param {string} id - The ID of the album to find.
   * @returns {Promise<Object>} A promise that resolves to the album object.
   * @throws {NotFoundError} If the album is not found.
   */
  async findAlbumById(id) {
    const queryAlbum = {
      text: "SELECT * FROM albums WHERE id = $1",
      values: [id],
    };
    const album = await this._pool.query(queryAlbum);

    if (album.rowCount !== 1) {
      throw new NotFoundError("Album not found");
    }

    const queryListSongs = {
      text: "SELECT * FROM songs WHERE album_id = $1",
      values: [album.rows[0].id],
    };

    const songs = await this._pool.query(queryListSongs);
    const newAlbum = album.rows.map(mapAlbumDbtoAlbumModel)[0];

    newAlbum.songs =
      songs.rows.length !== 0 ? songs.rows.map(mapSongDbtoSongModel) : [];

    return newAlbum;
  }

  /**
   * Updates an album by its ID in the database.
   * @param {string} id - The ID of the album to update.
   * @param {Object} param1 - The album details to update.
   * @param {string} param1.name - The name of the album.
   * @param {number} param1.year - The year of the album.
   * @returns {Promise<void>} A promise that resolves when the album is updated.
   * @throws {NotFoundError} If the album is not found.
   */
  async updateAlbumById(id, { name, year }) {
    const updatedAt = formatDateTime(new Date());
    const query = {
      text: "UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4",
      values: [name, year, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 1) {
      throw new NotFoundError(`Failed edit album, ${id} is not found`);
    }
  }

  async updateCoverAlbumById(id, coverUrl) {
    const updatedAt = formatDateTime(new Date());
    const query = {
      text: "UPDATE albums SET cover = $1, updated_at = $2 WHERE id = $3",
      values: [coverUrl, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 1) {
      throw new NotFoundError(`Failed edit album, ${id} is not found`);
    }
  }

  /**
   * Deletes an album by its ID from the database.
   * @param {string} id - The ID of the album to delete.
   * @returns {Promise<void>} A promise that resolves when the album is deleted.
   * @throws {NotFoundError} If the album is not found.
   */
  async deleteAlbumById(id) {
    const query = {
      text: "DELETE FROM albums WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 1) {
      throw new NotFoundError(`Failed delete album, ${id} is not found`);
    }
  }
}

module.exports = AlbumService;
