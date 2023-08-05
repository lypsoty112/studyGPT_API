const Router = require("@koa/router");

const service = require("../service/user");
const validate = require("./_validation.js");
const authenticate = require("../auth/authenticate");
const secureRoute = require("../auth/jwt");
const { getLogger } = require("../core/logging");
const Joi = require("joi");

// -------------------
// Validation
// -------------------
/* 
user_id int UN AI PK 
date_created datetime 
email varchar(255) 
password varchar(255) 
role_id int UN 
subscription_id int UN
*/

const validation = {
  user_id: Joi.number().integer().positive().required(),
  date_created: Joi.date().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role_id: Joi.number().integer().positive().required(),
  subscription_id: Joi.number().integer().positive().required(),
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
    id: validation.user_id,
  },
};

// -------------------
// Create
// -------------------
const create = async (ctx) => {
  ctx.body = await service.create(ctx.request.body);
  ctx.request.status = 201;
};
create.validationScheme = {
  body: {
    date_created: validation.date_created,
    email: validation.email,
    password: validation.password,
    role_id: validation.role_id,
    subscription_id: validation.subscription_id,
  },
};

// -------------------
// Update
// -------------------
const update = async (ctx) => {
  ctx.body = await service.update(ctx.params.id, ctx.request.body);
  ctx.request.status = 200;
};
update.validationScheme = {
  params: {
    id: validation.user_id,
  },
  body: {
    date_created: validation.date_created,
    email: validation.email,
    password: validation.password,
    role_id: validation.role_id,
    subscription_id: validation.subscription_id,
  },
};

// -------------------
// Delete
// -------------------
const deleteById = async (ctx) => {
  ctx.body = await service.deleteById(ctx.params.id);
  ctx.request.status = 200;
};
deleteById.validationScheme = {
  params: {
    id: validation.user_id,
  },
};

// -------------------
// Find by email
// -------------------
const getByEmail = async (ctx) => {
  ctx.body = await service.findByEmail(ctx.params.email);
  ctx.request.status = 200;
};
getByEmail.validationScheme = {
  params: {
    email: validation.email,
  },
};

// -------------------
// Log in
// -------------------
const logIn = async (ctx) => {
  ctx.body = await authenticate(ctx.request.body);
  ctx.request.status = 200;
};
logIn.validationScheme = {
  body: {
    email: validation.email,
    password: validation.password,
  },
};

// -------------------
// Register
// -------------------
const register = async (ctx) => {
  // Register the user
  await service.register(ctx.request.body.email, ctx.request.body.password);
  // Authenticate the user
  ctx.body = await authenticate(ctx.request.body);
  ctx.request.status = 501;
};
register.validationScheme = {
  body: {
    email: validation.email,
    password: validation.password,
  },
};

// Exports
module.exports = (app) => {
  const router = new Router({ prefix: "/user" });
  router.get("/", secureRoute, getAll);
  router.get("/:id", secureRoute, validate(getById.validationScheme), getById);
  router.post("/", secureRoute, validate(create.validationScheme), create);
  router.put("/:id", secureRoute, validate(update.validationScheme), update);
  router.get(
    "/email/:email",
    secureRoute,
    validate(getByEmail.validationScheme),
    getByEmail
  );
  router.delete(
    "/:id",
    secureRoute,
    validate(deleteById.validationScheme),
    deleteById
  );
  router.post("/login", validate(logIn.validationScheme), logIn);
  router.post("/register", validate(register.validationScheme), register);
  app.use(router.routes()).use(router.allowedMethods());
};
