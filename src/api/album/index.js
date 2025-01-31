const AlbumHandler = require("./album-handler");
const albumRoutes = require("./album-routes");

/**
 * Album plugin for Hapi.js server.
 * @type {Object}
 * @property {string} name - The name of the plugin.
 * @property {string} version - The version of the plugin.
 * @property {Function} register - The register function for the plugin.
 */
module.exports = {
  name: "album",
  version: "1.0.0",
  /**
   * Registers the album plugin with the Hapi.js server.
   * @param {Object} server - The Hapi.js server instance.
   * @param {Object} options - The plugin options.
   * @param {Object} options.service - The service instance.
   * @param {Object} options.validator - The validator instance.
   */
  register: async (server, { service, validator }) => {
    const albumHandler = new AlbumHandler(service, validator);
    server.route(albumRoutes(albumHandler));
  },
};
