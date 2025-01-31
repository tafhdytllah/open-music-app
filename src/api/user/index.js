const UserHandler = require("./user-handler");
const userRoutes = require("./user-routes");

/**
 * User plugin for Hapi.js server.
 * @type {Object}
 * @property {string} name - The name of the plugin.
 * @property {string} version - The version of the plugin.
 * @property {Function} register - The register function for the plugin.
 */
module.exports = {
  name: "user",
  version: "1.0.0",
  /**
   * Registers the user plugin with the Hapi.js server.
   * @param {Object} server - The Hapi.js server instance.
   * @param {Object} options - The plugin options.
   * @param {Object} options.service - The service instance.
   * @param {Object} options.validator - The validator instance.
   */
  register: async (server, { service, validator }) => {
    const userHandler = new UserHandler(service, validator);
    server.route(userRoutes(userHandler));
  },
};
