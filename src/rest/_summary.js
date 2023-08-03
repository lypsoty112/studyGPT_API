const Router = require("@koa/router");
const Joi = require("joi");
const multer = require("@koa/multer");

const service = require("../service/summary");
const validate = require("./_validation.js");
const { idValidation, summaryBodyValidation } = require("./__validations");

const config = require("config");
const fileSizeLimit = config.get("upload.fileSizeLimit");

// -------------------
// Get all
// -------------------
const getSummaries = async (ctx) => {
  ctx.body = await service.getAll();
  ctx.request.status = 200;
};
getSummaries.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getSummaryById = async (ctx) => {
  ctx.body = await service.getById(ctx.params.summaryId);
  ctx.request.status = 200;
};
getSummaryById.validationScheme = {
  params: {
    summaryId: idValidation,
  },
};

// -------------------
// create summary
// -------------------
// ToDo: update this route
const createSummary = async (ctx) => {
  const response = await service.create(ctx.request.file);
  ctx.body = response;
  ctx.status = 501;
};
createSummary.validationScheme = null;

// -------------------
// post summary
// -------------------
const postSummary = async (ctx) => {
  const response = await service.post(ctx.request.body);
  ctx.body = response;
  ctx.status = 201;
};
postSummary.validationScheme = {
  body: summaryBodyValidation,
};

// -------------------
// update summary
// -------------------
const updateSummary = async (ctx) => {
  ctx.body = await service.updateById(ctx.params.summaryId, ctx.request.body);
  ctx.status = 200;
};
updateSummary.validationScheme = {
  params: {
    summaryId: idValidation,
  },
  body: summaryBodyValidation,
};

// -------------------
// delete summary
// -------------------
const deleteSummary = async (ctx) => {
  await service.deleteById(ctx.params.summaryId);
  ctx.status = 204;
};

deleteSummary.validationScheme = {
  params: {
    summaryId: idValidation,
  },
};

// -------------------
// Exports
// -------------------

module.exports = (app) => {
  const router = new Router({ prefix: "/summary" });
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
  router.get("/", getSummaries);
  router.get(
    "/:summaryId",
    validate(getSummaryById.validationScheme),
    getSummaryById
  );
  router.post(
    "/create",
    upload.single("file"),
    validate(createSummary.validationScheme),
    createSummary
  );
  router.post("/", validate(postSummary.validationScheme), postSummary);
  router.put(
    "/:summaryId",
    validate(updateSummary.validationScheme),
    updateSummary
  );
  router.delete(
    "/:summaryId",
    validate(deleteSummary.validationScheme),
    deleteSummary
  );

  app.use(router.routes()).use(router.allowedMethods());
};
