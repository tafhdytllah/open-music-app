const UploadHandler = require("./upload-handler");
const uploadRoutes = require("./upload-routes");

module.exports = {
  name: "upload",
  version: "1.0.0",
  register: async (server, { storageService, albumService, validator }) => {
    const uploadHandler = new UploadHandler(
      storageService,
      albumService,
      validator,
    );
    server.route(uploadRoutes(uploadHandler));
  },
};
