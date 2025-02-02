const config = require("../../utils/config");

class UploadHandler {
  constructor(storageService, albumService, validator) {
    this._storageService = storageService;
    this._albumService = albumService;
    this._validator = validator;
  }

  async postUploadAlbumCoverHandler(request, h) {
    const { cover } = request.payload;
    this._validator.validateUploadAlbumCoverPayload(cover.hapi.headers);

    const { id: albumId } = request.params;

    const filename = await this._storageService.writeFile(cover, cover.hapi);

    const coverUrl = `http://${config.app.host}:${config.app.port}/upload/images/${filename}`;

    await this._albumService.updateCoverAlbumById(albumId, coverUrl);

    const response = h.response({
      status: "success",
      message: coverUrl,
    });
    response.code(201);

    return response;
  }
}

module.exports = UploadHandler;
