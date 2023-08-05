const Router = require("@koa/router");

const service = require("../service/subscription");
const validate = require("./_validation.js");
const secureRoute = require("../auth/jwt");
const Joi = require("joi");

// -------------------
// Validation
// -------------------

/*subscription_id int UN AI PK 
description text 
price decimal(10,2) 
title varchar(255)*/

const validation = {
  subscription_id: Joi.number().integer().positive().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  title: Joi.string().required(),
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
    id: validation.subscription_id,
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
    description: validation.description,
    price: validation.price,
    title: validation.title,
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
    id: validation.subscription_id,
  },
  body: {
    description: validation.description,
    price: validation.price,
    title: validation.title,
  },
};

// -------------------
// Delete
// -------------------
const deleteById = async (ctx) => {
  ctx.body = await service.remove(ctx.params.id);
  ctx.request.status = 200;
};
deleteById.validationScheme = {
  params: {
    id: validation.subscription_id,
  },
};

// -------------------
// Router
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/subscription" });

  router.get("/", validate(getAll.validationScheme), getAll);
  router.get("/:id", validate(getById.validationScheme), getById);
  router.post("/", secureRoute, validate(create.validationScheme), create);
  router.put("/:id", secureRoute, validate(update.validationScheme), update);
  router.delete(
    "/:id",
    secureRoute,
    validate(deleteById.validationScheme),
    deleteById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
