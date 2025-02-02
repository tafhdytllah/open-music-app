class AlbumLikeHandler {
  constructor(albumLikeService, albumService) {
    this._albumLikeService = albumLikeService;
    this._albumService = albumService;
  }

  async addAlbumLikeHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumService.findAlbumById(albumId);

    await this._albumLikeService.addAlbumLike(credentialId, albumId);

    const response = h.response({
      status: "success",
      message: "Berhasil like album",
    });

    response.code(201);
    return response;
  }

  async deleteAlbumLikeHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    console.log(albumId, credentialId);

    await this._albumLikeService.deleteAlbumLike(credentialId, albumId);

    const response = h.response({
      status: "success",
      message: "Like album berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const albumLikes = await this._albumLikeService.totalAlbumLike(albumId);

    const response = h.response({
      status: "success",
      data: {
        likes: albumLikes,
      },
    });

    response.code(200);
    return response;
  }
}

module.exports = AlbumLikeHandler;
