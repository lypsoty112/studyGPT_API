// File for setting up jwt strategy

const koaJwt = require("koa-jwt");

const config = require("config");
const JWT_SECRET = config.get("jwt.secret");

module.exports = koaJwt({
  secret: JWT_SECRET,
});
