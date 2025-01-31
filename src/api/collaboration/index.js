const CollaborationHandler = require("./collaboration-handler");
const routes = require("./collaboration-routes");

module.exports = {
  name: "collaboration",
  version: "1.0.0",
  /**
   * Registers the collaboration plugin with the Hapi.js server.
   * @param {Object} server - The Hapi.js server instance.
   * @param {Object} options - The plugin options.
   * @param {Object} options.collaborationService - The collaboration service instance.
   * @param {Object} options.playlistService - The playlist service instance.
   * @param {Object} options.userService - The user service instance.
   * @param {Object} options.validator - The validator instance.
   */
  register: async (
    server,
    { collaborationService, playlistService, userService, validator },
  ) => {
    const collaborationHandler = new CollaborationHandler(
      collaborationService,
      playlistService,
      userService,
      validator,
    );
    server.route(routes(collaborationHandler));
  },
};
