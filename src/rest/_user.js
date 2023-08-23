const Router = require("@koa/router");

const service = require("../service/user");
const validate = require("./_validation.js");
const secureRoute = require("../auth/jwt");
const { getLogger } = require("../core/logging");
const { getTokenInfo } = require("../auth/tokenInfo");
const Joi = require("joi");
const {
  authenticate,
  authenticateRefreshToken,
  validateRoles,
  roles,
} = require("../auth/authenticate");

const ENV = process.env.NODE_ENV || "development";

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

const setAuthentication = async function (ctx) {
  let [responseBody, refreshToken] = await authenticate(ctx.request.body);

  // Set the refresh token in a httpOnly cookie
  ctx.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 2, // 2 years
    sameSite: "Lax",
    secure: false,
  });

  ctx.body = responseBody;
  return ctx;
};

// -------------------
// Log in
// -------------------
const logIn = async (ctx) => {
  ctx = await setAuthentication(ctx);
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
  ctx = await setAuthentication(ctx);
  ctx.request.status = 201;
};
register.validationScheme = {
  body: {
    email: validation.email,
    password: validation.password,
  },
};

// -------------------
// Refresh token
// -------------------
const refresh = async (ctx) => {
  // Get the refresh token from the cookie
  const refreshToken = ctx.cookies.get("refreshToken");
  // Validate the refresh token
  ctx.body = await authenticateRefreshToken(refreshToken);
  // Authenticate the user
  ctx.request.status = 200;
};
refresh.validationScheme = null;

// -------------------
// Log out
// -------------------
const logOut = async (ctx) => {
  // Get the refresh token from the cookie
  // Delete the refresh token
  ctx.cookies.set("refreshToken", null, {
    httpOnly: true,
    maxAge: 0,
    sameSite: "Lax",
    secure: false,
  });
  ctx.body = null;
  ctx.request.status = 204;
};
logOut.validationScheme = null;

// -------------------
// Check password
// -------------------

const checkPassword = async (ctx) => {
  // Get the user
  // Returns an empty object if the user is not found
  ctx.body = await service.checkPassword(
    getTokenInfo(ctx).user_id,
    ctx.request.body.password
  );
  ctx.request.status = 204;
};
checkPassword.validationScheme = {
  body: {
    password: validation.password,
  },
};

// -------------------
// Me
// -------------------
const getMe = async (ctx) => {
  // Check if the user is logged in
  const tokenInfo = getTokenInfo(ctx);
  ctx.body = await service.findById(tokenInfo.user_id);
  ctx.request.status = 200;
};
getMe.validationScheme = null;

// -------------------
// Edit me
// -------------------
const editMe = async (ctx) => {
  // Check if the user is logged in
  const tokenInfo = getTokenInfo(ctx);
  // Edit the user

  ctx.body = await service.update(tokenInfo.user_id, ctx.request.body);
  ctx.request.status = 200;
};
editMe.validationScheme = {
  body: {
    email: validation.email.optional(),
    password: validation.password.optional(),
    subscription_id: validation.subscription_id.optional(),
  },
};

// Exports
module.exports = (app) => {
  const router = new Router({ prefix: "/user" });
  router.get("/", secureRoute, validateRoles(roles.admin), getAll);
  router.get("/me", secureRoute, getMe);
  router.get(
    "/id/:id",
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
    "/id/:id",
    secureRoute,
    validateRoles(roles.admin),
    validate(update.validationScheme),
    update
  );
  router.put("/me", secureRoute, validate(editMe.validationScheme), editMe);
  router.get(
    "/email/:email",
    secureRoute,
    validateRoles(roles.admin),
    validate(getByEmail.validationScheme),
    getByEmail
  );
  router.delete(
    "/id/:id",
    secureRoute,
    validateRoles(roles.admin),
    validate(deleteById.validationScheme),
    deleteById
  );
  router.post("/login", validate(logIn.validationScheme), logIn);
  router.post("/register", validate(register.validationScheme), register);
  router.post("/refresh", validate(refresh.validationScheme), refresh);
  router.post("/logout", validate(logOut.validationScheme), logOut);
  router.post(
    "/check-password",
    secureRoute,
    validate(checkPassword.validationScheme),
    checkPassword
  );
  app.use(router.routes()).use(router.allowedMethods());
};
