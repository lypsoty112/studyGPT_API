const Router = require("@koa/router");

const service = require("../service/payment");
const validate = require("./_validation.js");
const secureRoute = require("../auth/jwt");
const Joi = require("joi");
const { getTokenInfo } = require("../auth/tokenInfo");
const { validateRoles, roles } = require("../auth/authenticate");

// -------------------
// Validation
// -------------------

const validation = {
  id: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  payment_date: Joi.date().required(),
  payment_status: Joi.string().required(),
  subscription_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
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
    payment_id: validation.id,
    amount: validation.amount,
    currency: validation.currency,
    payment_date: validation.payment_date,
    payment_status: validation.payment_status,
    subscription_id: validation.subscription_id,
    user_id: validation.user_id,
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
    amount: validation.amount,
    currency: validation.currency,
    payment_date: validation.payment_date,
    payment_status: validation.payment_status,
    subscription_id: validation.subscription_id,
    user_id: validation.user_id,
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
// Get by user id
// -------------------
const getByUserId = async (ctx) => {
  ctx.body = await service.findByUserId(ctx.params.id);
  ctx.request.status = 200;
};
getByUserId.validationScheme = {
  params: {
    id: validation.user_id,
  },
};

// -------------------
// Get by token
// -------------------
const getByToken = async (ctx) => {
  ctx.body = await service.findByUserId(getTokenInfo(ctx).user_id);
  ctx.request.status = 200;
};
getByToken.validationScheme = null;

// -------------------
// Routes
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/payment" });

  router.get(
    "/",
    secureRoute,
    validateRoles(roles.admin),
    validate(getAll.validationScheme),
    getAll
  );
  router.get(
    "/id/:id",
    secureRoute,
    validateRoles(roles.admin),
    validate(getById.validationScheme),
    getById
  );
  router.get(
    "/token",
    secureRoute,
    validate(getByToken.validationScheme),
    getByToken
  );
  router.post(
    "/",
    validateRoles(roles.admin),
    secureRoute,
    validate(create.validationScheme),
    create
  );
  router.put(
    "/:id",
    validateRoles(roles.admin),
    secureRoute,
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
  router.get(
    "/user/:id",
    secureRoute,
    validateRoles(roles.admin),
    validate(getByUserId.validationScheme),
    getByUserId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
