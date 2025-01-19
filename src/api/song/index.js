const songRoutes = require('./song-route');
const SongHandler = require('./song-handler');

module.exports = {
  name: 'song',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songHandler = new SongHandler(service, validator);
    server.route(songRoutes(songHandler));
  },
};
