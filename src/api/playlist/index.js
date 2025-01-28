const PlaylistHandler = require("./playlist-handler");
const routes = require("./playlist-routes");

/**
 * Playlist plugin for Hapi.js server.
 * @type {Object}
 * @property {string} name - The name of the plugin.
 * @property {string} version - The version of the plugin.
 * @property {Function} register - The register function for the plugin.
 */
module.exports = {
  name: "playlist",
  version: "1.0.0",
  /**
   * Registers the playlist plugin with the Hapi.js server.
   * @param {Object} server - The Hapi.js server instance.
   * @param {Object} options - The plugin options.
   * @param {Object} options.playlistService - The playlist service instance.
   * @param {Object} options.userService - The user service instance.
   * @param {Object} options.songService - The song service instance.
   * @param {Object} options.activityService - The activity service instance.
   * @param {Object} options.validator - The validator instance.
   */
  register: async (
    server,
    { playlistService, userService, songService, activityService, validator },
  ) => {
    const playlistHandler = new PlaylistHandler(
      playlistService,
      userService,
      songService,
      activityService,
      validator,
    );
    server.route(routes(playlistHandler));
  },
};
