const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  db: {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT, 10),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  jwt: {
    access: {
      key: process.env.ACCESS_TOKEN_KEY,
      age: parseInt(process.env.ACCESS_TOKEN_AGE, 10),
    },
    refresh: {
      key: process.env.REFRESH_TOKEN_KEY,
    },
  },
  rabbitmq: {
    server: process.env.RABBITMQ_SERVER,
    maxUploadSize: parseInt(process.env.MAX_FILE_UPLOAD_SIZE, 10),
  },
  redis: {
    host: process.env.REDIS_HOST,
    cacheExpiration: parseInt(process.env.REDIS_CACHE_EXPIRATION, 10),
  },
};

module.exports = config;
