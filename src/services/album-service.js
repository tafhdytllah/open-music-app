const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/invariant-error');
const formatDateTime = require('../lib/date-time');
const NotFoundError = require('../exceptions/not-found-error');
const { mapAlbumDbtoAlbumModel } = require('../utils');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async insertAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id, name, year',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new InvariantError('Failed to create album');
    }

    return result.rows[0];
  }

  async findAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    console.log(result);
    if (result.rowCount !== 1) {
      throw new NotFoundError('Album not found');
    }

    return result.rows.map(mapAlbumDbtoAlbumModel)[0];
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
