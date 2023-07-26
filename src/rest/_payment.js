const Router = require("@koa/router");

const service = require("../service/payment");
const validate = require("./_validation.js");
const { idValidation, paymentBodyValidation } = require("./__validations");
const { permissions, hasPermission } = require("../core/auth");

// -------------------
// Get all
// -------------------
const getAllPayments = async (ctx) => {
  ctx.body = await service.getAll();
  ctx.request.status = 200;
};
getAllPayments.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getPaymentById = async (ctx) => {
  ctx.body = await service.getById(ctx.params.paymentId);
  ctx.request.status = 200;
};
getPaymentById.validationScheme = {
  params: {
    paymentId: idValidation,
  },
};

// -------------------
// Get by user id
// -------------------
const getPaymentByUserId = async (ctx) => {
  ctx.body = await service.getByUserId(ctx.params.userId);
  ctx.request.status = 200;
};
getPaymentByUserId.validationScheme = {
  params: {
    userId: idValidation,
  },
};

// -------------------
// create payment
// -------------------
const createPayment = async (ctx) => {
  const response = await service.create(ctx.request.body);
  ctx.body = response;
  ctx.status = 201;
};
createPayment.validationScheme = {
  body: paymentBodyValidation,
};

// -------------------
// update payment
// -------------------
const updatePayment = async (ctx) => {
  ctx.body = await service.updateById(ctx.params.paymentId, ctx.request.body);
  ctx.status = 200;
};
updatePayment.validationScheme = {
  params: {
    paymentId: idValidation,
  },
  body: paymentBodyValidation,
};

// -------------------
// delete payment
// -------------------
const deletePayment = async (ctx) => {
  await service.deleteById(ctx.params.paymentId);
  ctx.status = 204;
};
deletePayment.validationScheme = {
  params: {
    paymentId: idValidation,
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/payment" });

  router.get("/", validate(getAllPayments.validationScheme), getAllPayments);
  router.get(
    "/:paymentId",
    hasPermission(permissions.read, permissions.userRead),
    validate(getPaymentById.validationScheme),
    getPaymentById
  );
  router.get(
    "/user/:userId",
    hasPermission(permissions.read, permissions.userRead),
    validate(getPaymentByUserId.validationScheme),
    getPaymentByUserId
  );
  router.post(
    "/",
    hasPermission(permissions.write),
    validate(createPayment.validationScheme),
    createPayment
  );
  router.put(
    "/:paymentId",
    hasPermission(permissions.write),
    validate(updatePayment.validationScheme),
    updatePayment
  );
  router.delete(
    "/:paymentId",
    hasPermission(permissions.write),
    validate(deletePayment.validationScheme),
    deletePayment
  );

  app.use(router.routes()).use(router.allowedMethods());
};
