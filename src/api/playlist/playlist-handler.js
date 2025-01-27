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
}

module.exports = PlaylistHandler;
