class CollaborationHandler {
  /**
   * Creates an instance of CollaborationHandler.
   * @param {Object} collaborationService - The collaboration service instance.
   * @param {Object} validator - The validator instance.
   */
  constructor(collaborationService, playlistService, userService, validator) {
    this._collaborationService = collaborationService;
    this._playlistService = playlistService;
    this._userService = userService;
    this._validator = validator;
  }

  /**
   * Handles the request to add a new collaboration.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);

    await this._userService.verifyUserExists(userId);

    const id = await this._collaborationService.addCollaboration(
      playlistId,
      userId,
    );

    const response = h.response({
      status: "success",
      data: {
        collaborationId: id,
      },
    });
    response.code(201);

    return response;
  }

  /**
   * Handles the request to add a new collaboration.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async deleteCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);

    await this._collaborationService.deleteCollaboration(playlistId, userId);

    const response = h.response({
      status: "success",
      message: "Kolaborator playlist berhasil dihapus",
    });
    response.code(200);

    return response;
  }
}

module.exports = CollaborationHandler;
