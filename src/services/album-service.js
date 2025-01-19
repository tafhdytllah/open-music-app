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

    if (!result.rows.length) {
      throw new NotFoundError('Album not found');
    }

    return result.rows.map(mapAlbumDbtoAlbumModel)[0];
  }
}

module.exports = AlbumService;
