const config = require("../../utils/config");

/**
 * Defines the routes for the upload API.
 * @param {import("./upload-handler")} handler - The upload handler instance.
 */
const uploadRoutes = (handler) => [
  {
    method: "POST",
    path: "/albums/{id}/covers",
    handler: (request, h) => handler.postUploadAlbumCoverHandler(request, h),
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        output: "stream",
        maxBytes: config.rabbitmq.maxUploadSize, // 512kb
      },
    },
  },
];

module.exports = uploadRoutes;
