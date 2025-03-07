/**
 * @param {import("./album-like-handler")} handler
 */
const routes = (handler) => [
  {
    method: "POST",
    path: "/albums/{id}/likes",
    handler: (request, h) => handler.addAlbumLikeHandler(request, h),
    options: { auth: "openmusic_jwt" },
  },
  {
    method: "DELETE",
    path: "/albums/{id}/likes",
    handler: (request, h) => handler.deleteAlbumLikeHandler(request, h),
    options: { auth: "openmusic_jwt" },
  },
  {
    method: "GET",
    path: "/albums/{id}/likes",
    handler: (request, h) => handler.getAlbumLikesHandler(request, h),
  },
];

module.exports = routes;
