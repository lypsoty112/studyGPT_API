const Router = require("@koa/router");

const service = require("../service/subscription");
const validate = require("./_validation.js");
const { idValidation, subscriptionBodyValidation } = require("./__validations");
const { permissions, hasPermission } = require("../core/auth");

// -------------------
// Get all
// -------------------
const getAllSubscriptions = async (ctx) => {
  ctx.body = await service.getAll();
  ctx.request.status = 200;
};
getAllSubscriptions.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getSubscriptionById = async (ctx) => {
  ctx.body = await service.getById(ctx.params.subscriptionId);
  ctx.request.status = 200;
};
getSubscriptionById.validationScheme = {
  params: {
    subscriptionId: idValidation,
  },
};

// -------------------
// Create
// -------------------
const createSubscription = async (ctx) => {
  const response = await service.create(ctx.request.body);
  ctx.body = response;
  ctx.status = 201;
};
createSubscription.validationScheme = {
  body: subscriptionBodyValidation,
};

// -------------------
// Update
// -------------------
const updateSubscription = async (ctx) => {
  ctx.body = await service.updateById(
    ctx.params.subscriptionId,
    ctx.request.body
  );
  ctx.status = 200;
};
updateSubscription.validationScheme = {
  params: {
    subscriptionId: idValidation,
  },
  body: subscriptionBodyValidation,
};

// -------------------
// Delete
// -------------------
const deleteSubscription = async (ctx) => {
  await service.deleteById(ctx.params.subscriptionId);
  ctx.status = 204;
};
deleteSubscription.validationScheme = {
  params: {
    subscriptionId: idValidation,
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/subscription" });

  router.get(
    "/",
    validate(getAllSubscriptions.validationScheme),
    getAllSubscriptions
  );
  router.get(
    "/:subscriptionId",
    validate(getSubscriptionById.validationScheme),
    getSubscriptionById
  );
  router.post(
    "/",
    hasPermission(permissions.write),
    validate(createSubscription.validationScheme),
    createSubscription
  );
  router.put(
    "/:subscriptionId",
    hasPermission(permissions.write),
    validate(updateSubscription.validationScheme),
    updateSubscription
  );
  router.delete(
    "/:subscriptionId",
    hasPermission(permissions.write),
    validate(deleteSubscription.validationScheme),
    deleteSubscription
  );

  app.use(router.routes()).use(router.allowedMethods());
};
