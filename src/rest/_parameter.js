const Router = require("@koa/router");

const service = require("../service/parameter");
const validate = require("./_validation.js");
const secureRoute = require("../auth/jwt");
const Joi = require("joi");
const { validateRoles, roles } = require("../auth/authenticate");

// -------------------
// Validation
// -------------------

const validation = {
  id: Joi.number().integer().positive().required(),
  command: Joi.string().required(),
  description: Joi.string().required(),
  name: Joi.string().required(),
  parameter_class_id: Joi.number().integer().positive().required(),
  class_command: Joi.string().required(),
  class_description: Joi.string().required(),
  class_name: Joi.string().required(),
  selectionType: Joi.string().required(),
};

// -------------------
// Get all
// -------------------
const getAll = async (ctx) => {
  ctx.body = await service.findAll();
  ctx.request.status = 200;
};
getAll.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getById = async (ctx) => {
  ctx.body = await service.findById(ctx.params.id);
  ctx.request.status = 200;
};
getById.validationScheme = {
  params: {
    id: validation.id,
  },
};
// -------------------
// Create
// -------------------
const create = async (ctx) => {
  ctx.body = await service.create(ctx.request.body);
  ctx.status = 201;
};
create.validationScheme = {
  body: {
    command: validation.command,
    description: validation.description,
    name: validation.name,
    parameter_class_id: validation.parameter_class_id,
  },
};

// -------------------
// Update
// -------------------
const update = async (ctx) => {
  ctx.body = await service.update(ctx.params.id, ctx.request.body);
  ctx.status = 200;
};
update.validationScheme = {
  params: {
    id: validation.id,
  },
  body: {
    command: validation.command,
    description: validation.description,
    name: validation.name,
    parameter_class_id: validation.parameter_class_id,
  },
};
// -------------------
// Delete
// -------------------
const deleteById = async (ctx) => {
  ctx.body = await service.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteById.validationScheme = {
  params: {
    id: validation.id,
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/parameter" });
  router.get("/", secureRoute, getAll);
  router.get(
    "/:id",
    secureRoute,
    validateRoles(roles.admin),
    validate(getById.validationScheme),
    getById
  );
  router.post(
    "/",
    secureRoute,
    validateRoles(roles.admin),
    validate(create.validationScheme),
    create
  );
  router.put(
    "/:id",
    secureRoute,
    validateRoles(roles.admin),
    validate(update.validationScheme),
    update
  );
  router.delete(
    "/:id",
    secureRoute,
    validateRoles(roles.admin),
    validate(deleteById.validationScheme),
    deleteById
  );
  app.use(router.routes()).use(router.allowedMethods());
};
