const Router = require("@koa/router");

const service = require("../service/user");
const validate = require("./_validation.js");
const authenticate = require("../auth/authenticate");
const secureRoute = require("../auth/jwt");
const {
  idValidation,
  userBodyValidation,
  loginBodyValidation,
} = require("./__validations");

// -------------------
// Get all
// -------------------
const getAllUsers = async (ctx) => {
  ctx.body = await service.getAll();
  ctx.request.status = 200;
};
getAllUsers.validationScheme = null;

// -------------------
// Get by id
// -------------------
const getUserById = async (ctx) => {
  ctx.body = await service.getById(ctx.params.userId);
  ctx.request.status = 200;
};
getUserById.validationScheme = {
  params: {
    userId: idValidation,
  },
};

// -------------------
// create user
// -------------------
const createUser = async (ctx) => {
  const response = await service.create(ctx.request.body);
  ctx.body = response;
  ctx.status = 201;
};
createUser.validationScheme = {
  body: userBodyValidation,
};

// -------------------
// Log in
// -------------------
const logIn = async (ctx) => {
  const response = await authenticate(ctx.request.body);
  ctx.body = response;
  ctx.status = 200;
};
logIn.validationScheme = {
  body: loginBodyValidation,
};

// -------------------
// update user
// -------------------
const updateUser = async (ctx) => {
  ctx.body = await service.updateById(ctx.params.userId, ctx.request.body);
  ctx.status = 200;
};
updateUser.validationScheme = {
  params: {
    userId: idValidation,
  },
  body: userBodyValidation,
};

// -------------------
// Delete
// -------------------
const deleteUser = async (ctx) => {
  await service.deleteById(ctx.params.userId);
  ctx.status = 204;
};
deleteUser.validationScheme = {
  params: {
    userId: idValidation,
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: "/user" });

  router.get(
    "/",
    secureRoute,
    validate(getAllUsers.validationScheme),
    getAllUsers
  );
  router.get(
    "/:userId",
    secureRoute,
    validate(getUserById.validationScheme),
    getUserById
  );
  router.post(
    "/",
    secureRoute,
    validate(createUser.validationScheme),
    createUser
  );
  router.post("/login", validate(logIn.validationScheme), logIn);
  router.put(
    "/:userId",
    secureRoute,
    validate(updateUser.validationScheme),
    updateUser
  );
  router.delete(
    "/:userId",
    secureRoute,
    validate(deleteUser.validationScheme),
    deleteUser
  );

  app.use(router.routes()).use(router.allowedMethods());
};
