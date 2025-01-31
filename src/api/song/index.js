const songRoutes = require("./song-routes");
const SongHandler = require("./song-handler");

/**
 * Song plugin for Hapi.js server.
 * @type {Object}
 * @property {string} name - The name of the plugin.
 * @property {string} version - The version of the plugin.
 * @property {Function} register - The register function for the plugin.
 */
module.exports = {
  name: "song",
  version: "1.0.0",
  /**
   * Registers the song plugin with the Hapi.js server.
   * @param {Object} server - The Hapi.js server instance.
   * @param {Object} options - The plugin options.
   * @param {Object} options.service - The service instance.
   * @param {Object} options.validator - The validator instance.
   */
  register: async (server, { service, validator }) => {
    const songHandler = new SongHandler(service, validator);
    server.route(songRoutes(songHandler));
  },
};
