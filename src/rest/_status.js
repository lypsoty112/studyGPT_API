const Router = require("@koa/router");

const service = require("../service/status");
const validate = require("./_validation.js");
const { idValidation } = require("./__validations");
const { permissions, hasPermission } = require("../core/auth");

// -------------------
// Get all
// -------------------
const getAllStatuses = async (ctx) => {
  ctx.body = await service.getAll();
  ctx.request.status = 200;
};
getAllStatuses.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getStatusById = async (ctx) => {
  ctx.body = await service.getById(ctx.params.statusId);
  ctx.request.status = 200;
};
getStatusById.validationScheme = {
  params: {
    statusId: idValidation,
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/status" });

  router.get(
    "/",
    hasPermission(permissions.read, permissions.userRead),
    validate(getAllStatuses.validationScheme),
    getAllStatuses
  );
  router.get(
    "/:statusId",
    hasPermission(permissions.read, permissions.userRead),
    validate(getStatusById.validationScheme),
    getStatusById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
