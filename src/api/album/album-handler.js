class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;

    const album = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        album,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = AlbumHandler;
