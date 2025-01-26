class SongHandler {
  /**
   * Creates an instance of SongHandler.
   * @param {Object} service - The service instance.
   * @param {Object} validator - The validator instance.
   */
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  /**
   * Handles the request to add a new song.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   */
  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { title, year, genre, performer, duration, albumId } =
      request.payload;

    const songId = await this._service.insertSong({
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    });

    const response = h.response({
      status: "success",
      data: {
        songId: songId,
      },
    });
    response.code(201);

    return response;
  }

  /**
   * Handles the request to get all songs.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object containing the list of songs.
   */
  async getSongsHandler(request, h) {
    const { title, performer } = request.query;
    await this._validator.validateSongQuery({ title, performer });

    const songs = await this._service.listSongs();

    const filteredSongs = songs.filter((song) => {
      const matchTitle = title
        ? song.title.toLowerCase().includes(title.toLowerCase())
        : true;
      const matchPerformer = performer
        ? song.performer.toLowerCase().includes(performer.toLowerCase())
        : true;
      return matchTitle && matchPerformer;
    });

    const response = h.response({
      status: "success",
      data: {
        songs: filteredSongs,
      },
    });

    return response;
  }

  /**
   * Handles the request to get a song by its ID.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object containing the song details.
   * @throws {NotFoundError} If the song is not found.
   */
  async getSongByIdHandler(request, h) {
    const { id } = request.params;

    const song = await this._service.getSongById(id);

    const response = h.response({
      status: "success",
      data: {
        song,
      },
    });

    return response;
  }

  /**
   * Handles the request to update a song by its ID.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   * @throws {NotFoundError} If the song is not found.
   */
  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { id } = request.params;

    await this._service.updateSongById(id, request.payload);

    const response = h.response({
      status: "success",
      message: "Song has been successfully updated",
    });
    response.code(200);

    return response;
  }

  /**
   * Handles the request to delete a song by its ID.
   * @param {Object} request - The request object.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response object.
   * @throws {NotFoundError} If the song is not found.
   */
  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.removeSongById(id);

    const response = h.response({
      status: "success",
      message: "Song has been successfully deleted",
    });
    response.code(200);

    return response;
  }
}

module.exports = SongHandler;
