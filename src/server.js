require("dotenv").config();

const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const AlbumService = require("./services/album-service");
const SongService = require("./services/song-service");
const UserService = require("./services/user-service");
const AuthenticationService = require("./services/authentication-service");
const PlaylistService = require("./services/playlist-service");
const CollaborationService = require("./services/collaboration-service");
const ActivityService = require("./services/activity-service");
const album = require("./api/album");
const song = require("./api/song");
const user = require("./api/user");
const playlist = require("./api/playlist");
const authentication = require("./api/authentication");
const collaboration = require("./api/collaboration");
const AlbumValidator = require("./validator/album");
const SongValidator = require("./validator/song");
const UserValidator = require("./validator/user");
const AuthenticationValidator = require("./validator/authentication");
const TokenManager = require("./tokenize/token-manager");
const PlaylistValidator = require("./validator/playlist");
const CollaborationValidator = require("./validator/collaboration");
const ClientError = require("./exceptions/client-error");

const init = async () => {
  const collaborationService = new CollaborationService();
  const albumService = new AlbumService();
  const songService = new SongService();
  const userService = new UserService();
  const authenticationService = new AuthenticationService();
  const activityService = new ActivityService();
  const playlistService = new PlaylistService(
    collaborationService,
    activityService,
  );

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy("openmusic_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: album,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: song,
      options: {
        service: songService,
        validator: SongValidator,
      },
    },
    {
      plugin: user,
      options: {
        service: userService,
        validator: UserValidator,
      },
    },
    {
      plugin: authentication,
      options: {
        authenticationService,
        userService,
        tokenManager: TokenManager,
        validator: AuthenticationValidator,
      },
    },
    {
      plugin: playlist,
      options: {
        playlistService,
        userService,
        songService,
        validator: PlaylistValidator,
      },
    },
    {
      plugin: collaboration,
      options: {
        collaborationService,
        playlistService,
        userService,
        validator: CollaborationValidator,
      },
    },
  ]);

  /**
   * Extension point for handling pre-response.
   */
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    /**
     * Error handler
     */
    if (response instanceof Error) {
      // Client Error handler secara internal
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });

        newResponse.code(response.statusCode);
        return newResponse;
      }
      //mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc
      if (!response.isServer) {
        return h.continue;
      }

      // Internal Server Error handle sesuai kebutuhan
      const newResponse = h.response({
        status: "fail",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });

      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
