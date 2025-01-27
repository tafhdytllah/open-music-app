class PlaylistHandler {
  /**
   * Creates an instance of PlaylistHandler.
   * @param {Object} playlistService - The playlist service instance.
   * @param {Object} userService - The user service instance.
   * @param {Object} songService - The song service instance.
   * @param {Object} validator - The validator instance.
   */
  constructor(playlistService, userService, songService, validator) {
    this._playlistService = playlistService;
    this._userService = userService;
    this._songService = songService;
    this._validator = validator;
  }

  /**
   * Handles the request to create a new playlist.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async postPlaylistHandler(request, h) {
    this._validator.validatePostPlaylistPayload(request.payload);

    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistService.createPlaylist({
      name,
      owner: credentialId,
    });

    const response = h.response({
      status: "success",
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Handles the request to add a song to a playlist.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async postSongToPlaylistHandler(request, h) {
    this._validator.validatePostSongToPlaylistPayload(request.payload);

    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);

    await this._songService.getSongById(songId);

    await this._playlistService.addSongToPlaylist(
      playlistId,
      songId,
      credentialId,
    );

    const response = h.response({
      status: "success",
      message: "Song has been successfully added to playlist",
    });
    response.code(201);
    return response;
  }

  /**
   * Handles the request to get playlists owned by or shared with the specified user.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object containing the list of playlists.
   */
  async getPlaylistHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const playlists = await this._playlistService.getPlaylists(credentialId);

    const response = h.response({
      status: "success",
      data: {
        playlists,
      },
    });
    response.code(200);
    return response;
  }

  /**
   * Handles the request to get songs from a playlist.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object containing the list of songs in the playlist.
   */
  async getSongsFromPlaylistHandler(request, h) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);

    const playlist = await this._playlistService.getSongsFromPlaylist(
      playlistId,
    );

    const response = h.response({
      status: "success",
      data: {
        playlist,
      },
    });
    response.code(200);
    return response;
  }

  /**
   * Handles the request to delete a playlist by its ID.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(id, credentialId);

    await this._playlistService.deletePlaylistById(id);

    const response = h.response({
      status: "success",
      message: "Playlist berhasil dihapus",
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistHandler;
