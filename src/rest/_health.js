const Router = require("@koa/router");
const healthService = require("../service/health");
const validate = require("./_validation");

// -------------------
// Ping
// -------------------
const ping = async (ctx) => {
  ctx.body = healthService.ping();
};
ping.validationScheme = null;

// -------------------
// Get version
// -------------------
const getVersion = async (ctx) => {
  ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

// -------------------
// Exports
// -------------------
module.exports = function installPlacesRoutes(app) {
  const router = new Router({
    prefix: "/health",
  });

  router.get("/ping", validate(ping.validationScheme), ping);
  router.get("/version", validate(getVersion.validationScheme), getVersion);

  app.use(router.routes()).use(router.allowedMethods());
};
