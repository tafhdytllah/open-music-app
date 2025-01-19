const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const formatDateTime = require('../lib/date-time');
const InvariantError = require('../exceptions/invariant-error');
const NotFoundError = require('../exceptions/not-found-error');
const { mapSongDbtoSongModel } = require('../utils');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async insertSong({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());
    const updatedAt = createdAt;

    if (albumId !== undefined) {
      const findAlbumById = {
        text: 'SELECT id FROM albums WHERE id = $1',
        values: [albumId],
      };

      const result = await this._pool.query(findAlbumById);

      if (result.rowCount === 0) {
        throw new NotFoundError(
          `Failed create new song, ${albumId} is not found`
        );
      }
    }

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, title, performer',
      values: [
        id,
        albumId,
        title,
        year,
        genre,
        performer,
        duration,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 1) {
      throw new InvariantError('Failed to create song');
    }

    return result.rows[0];
  }

  async listSongs() {
    const result = await this._pool.query('SELECT * FROM songs');
    return result.rows.map(mapSongDbtoSongModel);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Song not found');
    }

    return result.rows[0];
  }
}

module.exports = SongService;
