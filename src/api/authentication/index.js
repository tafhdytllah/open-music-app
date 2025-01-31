const AuthenticationHandler = require("./authentication-handler");
const routes = require("./authentication-routes");

module.exports = {
  name: "authentication",
  version: "1.0.0",
  /**
   * Registers the authentication plugin with the Hapi.js server.
   * @param {Object} server - The Hapi.js server instance.
   * @param {Object} options - The plugin options.
   * @param {Object} options.authenticationService - The authentication service instance.
   * @param {Object} options.userService - The user service instance.
   * @param {Object} options.tokenManager - The token manager instance.
   * @param {Object} options.validator - The validator instance.
   */
  register: async (
    server,
    { authenticationService, userService, tokenManager, validator },
  ) => {
    const authenticationHandler = new AuthenticationHandler(
      authenticationService,
      userService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationHandler));
  },
};
