const Joi = require("joi");
const Router = require("@koa/router");
const service = require("../service/currency");
const validate = require("./_validation.js");
const { idValidation } = require("./__validations");

// -------------------
// Get all
// -------------------
const getAllCurrencies = async (ctx) => {
  ctx.body = await service.getAll();
  ctx.request.status = 200;
};
getAllCurrencies.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getCurrencyById = async (ctx) => {
  ctx.body = await service.getById(ctx.params.currencyId);
  ctx.request.status = 200;
};
getCurrencyById.validationScheme = {
  params: {
    currencyId: idValidation,
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/currency" });

  router.get(
    "/",
    validate(getAllCurrencies.validationScheme),
    getAllCurrencies
  );
  router.get(
    "/:currencyId",
    validate(getCurrencyById.validationScheme),
    getCurrencyById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
