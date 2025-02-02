const ExportHandler = require("./export-handler");
const routes = require("./export-routes");

module.exports = {
  name: "export",
  version: "1.0.0",
  register: async (server, { producerService, playlistService, validator }) => {
    const exportHandler = new ExportHandler(
      producerService,
      playlistService,
      validator,
    );
    server.route(routes(exportHandler));
  },
};
