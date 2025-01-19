const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/invariant-error');
const formatDateTime = require('../lib/date-time');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id, name, year',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    console.log(result);
    if (!result.rows[0]) {
      throw new InvariantError('Failed to create album');
    }

    return result.rows[0];
  }
}

module.exports = AlbumService;
