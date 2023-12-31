module.exports = {
  env: "NODE_ENV",
  port: "PORT",
  database: {
    host: "DATABASE_HOST",
    port: "DATABASE_PORT",
    username: "DATABASE_USERNAME",
    password: "DATABASE_PASSWORD",
  },
  jwt: {
    secret: "JWT_SECRET",
    refresh: {
      secret: "JWT_REFRESH_SECRET",
    },
  },
  encryption: {
    key: "ENCRYPTION_KEY",
  },
  ai: {
    api: "AI_API",
  },
};
