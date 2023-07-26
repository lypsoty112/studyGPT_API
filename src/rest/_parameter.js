const Router = require("@koa/router");

const service = require("../service/parameter");
const validate = require("./_validation.js");
const { idValidation } = require("./__validations");
const { permissions, hasPermission } = require("../core/auth");

// -------------------
// Get all
// -------------------
const getAllParameters = async (ctx) => {
  ctx.body = await service.getAll();
  ctx.request.status = 200;
};
getAllParameters.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getParameterById = async (ctx) => {
  ctx.body = await service.getById(ctx.params.parameterId);
  ctx.request.status = 200;
};
getParameterById.validationScheme = {
  params: {
    parameterId: idValidation,
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/parameter" });

  router.get(
    "/",
    hasPermission(permissions.read, permissions.userRead),
    validate(getAllParameters.validationScheme),
    getAllParameters
  );
  router.get(
    "/:parameterId",
    hasPermission(permissions.read, permissions.userRead),
    validate(getParameterById.validationScheme),
    getParameterById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
