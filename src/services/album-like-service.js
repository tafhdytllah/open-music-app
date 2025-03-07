const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const formatDateTime = require("../lib/date-time");
const InvariantError = require("../exceptions/invariant-error");

class AlbumLikeService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbumLike(credentialId, albumId) {
    const cacheKey = `album_like:${albumId}`;

    const isUserLikeAlbum = await this.isUserLikeAlbum(credentialId, albumId);
    if (isUserLikeAlbum) {
      throw new InvariantError("Album already liked by user");
    }

    const id = `album_like-${nanoid(16)}`;
    const createdAt = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO user_album_likes VALUES($1, $2, $3, $4, $4) RETURNING id",
      values: [id, credentialId, albumId, createdAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new InvariantError("Failed to add album like");
    }

    await this._cacheService.delete(cacheKey);

    return result.rows[0].id;
  }

  async deleteAlbumLike(credentialId, albumId) {
    const cacheKey = `album_like:${albumId}`;

    const query = {
      text: "DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id",
      values: [credentialId, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      throw new InvariantError("Failed to delete like album");
    }

    await this._cacheService.delete(cacheKey);
  }

  async totalAlbumLike(albumId) {
    const cacheKey = `album_like:${albumId}`;

    try {
      const likes = await this._cacheService.get(cacheKey);

      return {
        likes: parseInt(likes, 10),
        isCache: true,
      };
    } catch {
      const query = {
        text: "SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1",
        values: [albumId],
      };

      const result = await this._pool.query(query);

      if (!result.rows[0]) {
        throw new InvariantError("Failed to get total album like");
      }
      const likes = result.rows[0].count;

      await this._cacheService.set(cacheKey, likes);

      return {
        likes: parseInt(likes, 10),
        isCache: false,
      };
    }
  }

  async isUserLikeAlbum(credentialId, albumId) {
    const query = {
      text: "SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2",
      values: [credentialId, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0]) {
      return false;
    }

    return true;
  }
}

module.exports = AlbumLikeService;
