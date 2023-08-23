module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  database: {
    client: "mysql2",
    name: "studyGPT_production",
  },
  cors: {
    origins: ["http://localhost:5173"],
    maxAge: 3 * 60 * 60,
  },
  process: {
    path: "./src/python/main.py",
  },
  upload: {
    fileSizeLimit: 15000000, // 15MB
  },
  jwt: {
    expiresIn: "10m",
    refresh: {
      expiresIn: "1y",
    },
  },
};
