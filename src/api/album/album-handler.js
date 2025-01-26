class AlbumHandler {
  /**
   * Creates an instance of AlbumHandler.
   * @param {Object} service - The service instance.
   * @param {Object} validator - The validator instance.
   */
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  /**
   * Handles the request to add a new album.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;

    const albumId = await this._service.insertAlbum({ name, year });

    const response = h.response({
      status: "success",
      data: {
        albumId: albumId,
      },
    });
    response.code(201);

    return response;
  }

  /**
   * Handles the request to get an album by its ID.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;

    const album = await this._service.findAlbumById(id);

    const response = h.response({
      status: "success",
      data: {
        album,
      },
    });
    response.code(200);

    return response;
  }

  /**
   * Handles the request to update an album by its ID.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.updateAlbumById(id, request.payload);

    const response = h.response({
      status: "success",
      message: "Album has been successfully updated",
    });
    response.code(200);

    return response;
  }

  /**
   * Handles the request to delete an album by its ID.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    const response = h.response({
      status: "success",
      message: "Album has been successfully deleted",
    });
    response.code(200);

    return response;
  }
}

module.exports = AlbumHandler;
