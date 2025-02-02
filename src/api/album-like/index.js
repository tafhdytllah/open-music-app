const AlbumLikeHandler = require("./album-like-handler");
const routes = require("./album-like-routes");

module.exports = {
  name: "album-like",
  version: "1.0.0",
  register: async (server, { albumLikeService, albumService }) => {
    const albumLikeHandler = new AlbumLikeHandler(
      albumLikeService,
      albumService,
    );
    server.route(routes(albumLikeHandler));
  },
};
