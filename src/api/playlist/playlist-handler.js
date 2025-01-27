class PlaylistHandler {
  /**
   * Creates an instance of PlaylistHandler.
   * @param {Object} playlistService - The playlist service instance.
   * @param {Object} userService - The user service instance.
   * @param {Object} validator - The validator instance.
   */
  constructor(playlistService, userService, validator) {
    this._playlistService = playlistService;
    this._userService = userService;
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

    const { id: credentialId } = request.auth.credentials;
    const { name } = request.payload;

    await this._userService.getUserById(credentialId);

    const playlistId = await this._playlistService.createPlaylist({
      name,
      credentialId,
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
   * Handles the request to get playlists owned by or shared with the specified user.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object containing the list of playlists.
   */
  async getPlaylistHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    await this._userService.getUserById(credentialId);

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
}

module.exports = PlaylistHandler;
