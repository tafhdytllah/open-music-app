class ExportHandler {
  constructor(producerService, playlistService, validator) {
    this._producerService = producerService;
    this._playlistService = playlistService;
    this._validator = validator;
  }

  async postExportPlaylistHandler(request, h) {
    this._validator.validateExportPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { targetEmail } = request.payload;

    await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);

    const message = {
      playlistId: playlistId,
      targetEmail: targetEmail,
    };

    await this._producerService.sendMessage(
      "export:playlist",
      JSON.stringify(message),
    );

    const response = h.response({
      status: "success",
      message: "Permintaan Anda sedang kami proses",
    });
    response.code(201);

    return response;
  }
}

module.exports = ExportHandler;
