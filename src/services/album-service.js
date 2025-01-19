const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/invariant-error');
const formatDateTime = require('../lib/date-time');
const NotFoundError = require('../exceptions/not-found-error');
const { mapAlbumDbtoAlbumModel, mapSongDbtoSongModel } = require('../utils');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async insertAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new InvariantError('Failed to create album');
    }

    return result.rows[0].id;
  }

  async findAlbumById(id) {
    const queryAlbum = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const album = await this._pool.query(queryAlbum);

    if (album.rowCount !== 1) {
      throw new NotFoundError('Album not found');
    }

    const queryListSongs = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [album.rows[0].id],
    };

    const songs = await this._pool.query(queryListSongs);
    const newAlbum = album.rows.map(mapAlbumDbtoAlbumModel)[0];

    newAlbum.songs =
      songs.rows.length !== 0 ? songs.rows.map(mapSongDbtoSongModel) : [];

    return newAlbum;
  }

  async updateAlbumById(id, { name, year }) {
    const updatedAt = formatDateTime(new Date());
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4',
      values: [name, year, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 1) {
      throw new NotFoundError(`Failed edit album, ${id} is not found`);
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount !== 1) {
      throw new NotFoundError(`Failed delete album, ${id} is not found`);
    }
  }
}

module.exports = AlbumService;
