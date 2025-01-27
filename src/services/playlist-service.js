const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const formatDateTime = require("../lib/date-time");
const InvariantError = require("../exceptions/invariant-error");
const {
  mapPlaylistDbtoPlaylistModel,
  mapSongDbtoSongModel,
} = require("../utils");
const NotFoundError = require("../exceptions/not-found-error");
const AuthorizationError = require("../exceptions/authorization-error");

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * Verifies the owner of a playlist.
   * @param {string} id - The ID of the playlist.
   * @param {string} owner - The ID of the user to verify.
   * @returns {Promise<void>} A promise that resolves if the user is the owner of the playlist.
   * @throws {NotFoundError} If the playlist is not found.
   * @throws {AuthorizationError} If the user is not the owner of the playlist.
   */
  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: "SELECT * FROM playlists WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (result.rows.length === 0) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }

    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }

  /**
   * Creates a new playlist.
   * @param {Object} param0 - The playlist details.
   * @param {string} param0.name - The name of the playlist.
   * @param {string} param0.owner - The ID of the user who owns the playlist.
   * @returns {Promise<string>} The ID of the newly created playlist.
   * @throws {InvariantError} If the playlist could not be created.
   */
  async createPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const created_at = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO playlists(id, name, owner, created_at, updated_at) VALUES($1, $2, $3, $4, $4) RETURNING id",
      values: [id, name, owner, created_at],
    };

    const result = await this._pool.query(query);
    if (result.rows.length === 0) {
      throw new InvariantError("Failed to create playlist");
    }

    return result.rows[0].id;
  }

  async addSongToPlaylist(playlistId, songId) {
    const id = `playlist-song-${nanoid(16)}`;
    const created_at = formatDateTime(new Date());

    const query = {
      text: "INSERT INTO playlist_songs(id, playlist_id, song_id, created_at, updated_at) VALUES($1, $2, $3, $4, $4) RETURNING id",
      values: [id, playlistId, songId, created_at],
    };

    const result = await this._pool.query(query);
    if (result.rows.length === 0) {
      throw new InvariantError("Failed to add song to playlist");
    }
  }

  /**
   * Retrieves playlists owned by or shared with the specified user.
   * @param {string} owner - The ID of the user.
   * @returns {Promise<Object[]>} A promise that resolves to an array of playlist objects.
   */
  async getPlaylists(owner) {
    const query = {
      text: "select p.id, p.name, u.username from playlists as p left join users as u on u.id = p.owner where p.owner = $1 or u.id = $1 group by p.id, u.username",
      values: [owner],
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapPlaylistDbtoPlaylistModel);
  }

  /**
   * Retrieves songs from a playlist.
   * @param {string} playlistId - The ID of the playlist.
   * @returns {Promise<Object>} A promise that resolves to an object containing the playlist ID, name, owner, and an array of song objects in the playlist.
   * @throws {NotFoundError} If the playlist is not found.
   */
  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: "SELECT p.id AS playlist_id, p.name AS playlist_name, u.username AS owner_username, s.id AS id, s.title AS title, s.performer AS performer FROM playlist_songs AS ps INNER JOIN songs AS s ON s.id = ps.song_id INNER JOIN playlists AS p ON p.id = ps.playlist_id INNER JOIN users AS u ON u.id = p.owner WHERE ps.playlist_id = $1",
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }

    const songs = result.rows.map(mapSongDbtoSongModel);

    const playlist = {
      id: result.rows[0].playlist_id,
      name: result.rows[0].playlist_name,
      username: result.rows[0].owner_username,
      songs: songs,
    };

    return playlist;
  }

  /**
   * Deletes a playlist by ID.
   * @param {string} id - The ID of the playlist.
   * @returns {Promise<void>} A promise that resolves if the playlist is successfully deleted.
   */
  async deletePlaylistById(id) {
    const query = {
      text: "DELETE FROM playlists WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }
  }
}

module.exports = PlaylistService;
