class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

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
      status: 'success',
      data: {
        songId: songId,
      },
    });
    response.code(201);
    return response;
  }

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
      status: 'success',
      data: {
        songs: filteredSongs,
      },
    });

    return response;
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;

    const song = await this._service.getSongById(id);

    const response = h.response({
      status: 'success',
      data: {
        song,
      },
    });
    return response;
  }

  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);

    const { id } = request.params;

    await this._service.updateSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Song has been successfully updated',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.removeSongById(id);

    return {
      status: 'success',
      message: 'Song has been successfully deleted',
    };
  }
}

module.exports = SongHandler;
