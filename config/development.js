module.exports = {
  log: {
    level: "silly",
    disabled: false,
  },
  database: {
    client: "mysql2",
    name: "studyGPT_development",
  },
  cors: {
    origins: ["http://localhost:5173"],
    maxAge: 3 * 60 * 60,
  },
  process: {
    path: "./src/python/main.py",
  },
  upload: {
    fileSizeLimit: 30000000, // 30MB
  },
  jwt: {
    expiresIn: "7d",
  },
};
