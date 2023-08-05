const Router = require("@koa/router");
const Joi = require("joi");
const multer = require("@koa/multer");

const service = require("../service/summary");
const validate = require("./_validation.js");
const secureRoute = require("../auth/jwt");

const config = require("config");
const fileSizeLimit = config.get("upload.fileSizeLimit");

// -------------------
// Validation
// -------------------
/* 
summary_id int UN AI PK 
content text 
date_created datetime 
date_modified datetime 
description text 
title varchar(255) 
user_id int UN
*/

const validation = {
  summary_id: Joi.number().integer().positive().required(),
  content: Joi.string().required(),
  date_created: Joi.date().required(),
  date_modified: Joi.date().required(),
  description: Joi.string().required(),
  title: Joi.string().required(),
  user_id: Joi.number().integer().positive().required(),
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "data/uploads");
    },
  }),
  limits: {
    fileSize: fileSizeLimit,
  },
});

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
    id: validation.summary_id,
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
    content: validation.content,
    date_created: validation.date_created,
    date_modified: validation.date_modified,
    description: validation.description,
    title: validation.title,
    user_id: validation.user_id,
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
    id: validation.summary_id,
  },
  body: {
    content: validation.content,
    date_created: validation.date_created,
    date_modified: validation.date_modified,
    description: validation.description,
    title: validation.title,
    user_id: validation.user_id,
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
    id: validation.summary_id,
  },
};

// -------------------
// New summary
// -------------------
const newSummary = async (ctx) => {
  ctx.body = await service.newSummary(ctx.request.body, ctx.file);
  ctx.request.status = 201;
};
newSummary.validationScheme = {
  body: {
    description: validation.description,
    title: validation.title,
    user_id: validation.user_id,
  },
};

// -------------------
// find by user id
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
// Exports
// -------------------

module.exports = (app) => {
  const router = new Router({ prefix: "/summary" });
  router.get("/", secureRoute, getAll);
  router.get("/:id", secureRoute, validate(getById.validationScheme), getById);
  router.post("/", secureRoute, validate(create.validationScheme), create);
  router.put("/:id", secureRoute, validate(update.validationScheme), update);
  router.delete(
    "/:id",
    secureRoute,
    validate(deleteById.validationScheme),
    deleteById
  );
  router.post(
    "/new",
    secureRoute,
    upload.single("file"),
    validate(newSummary.validationScheme),
    newSummary
  );
  router.get(
    "/user/:id",
    secureRoute,
    validate(getByUserId.validationScheme),
    getByUserId
  );
  app.use(router.routes()).use(router.allowedMethods());
};
