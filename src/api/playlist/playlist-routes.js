/**
 * @param {import("./playlist-handler")} handler
 */
const routes = (handler) => [
  {
    method: "POST",
    path: "/playlists",
    handler: (request, h) => handler.postPlaylistHandler(request, h),
    options: {
      auth: "openmusic_jwt",
    },
  },
  {
    method: "GET",
    path: "/playlists",
    handler: (request, h) => handler.getPlaylistHandler(request, h),
    options: {
      auth: "openmusic_jwt",
    },
  },
];

module.exports = routes;
