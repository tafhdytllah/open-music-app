require('dotenv').config();

const Hapi = require('@hapi/hapi');
const AlbumService = require('./services/album-service');
const album = require('./api/album');
const AlbumValidator = require('./validator/album');
const ClientError = require('./exceptions/client-error');

const init = async () => {
  const albumService = new AlbumService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: album,
    options: {
      service: albumService,
      validator: AlbumValidator,
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
