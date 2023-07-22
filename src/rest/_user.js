const Router = require('@koa/router');

const service = require('../service/user');
const validate = require('./_validation.js');
const { idValidation, userBodyValidation } = require('./__validations');

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
    userId: idValidation
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
  body: userBodyValidation
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
    userId: idValidation
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
    userId: idValidation
  },
};

// -------------------
// Exports
// -------------------
module.exports = (app) => {
  const router = new Router({ prefix: '/user' });

  router.get('/', validate(getAllUsers.validationScheme), getAllUsers);
  router.get('/:userId', validate(getUserById.validationScheme), getUserById);
  router.post('/', validate(createUser.validationScheme), createUser);
  router.put('/:userId', validate(updateUser.validationScheme), updateUser);
  router.delete('/:userId', validate(deleteUser.validationScheme), deleteUser);

  app.use(router.routes()).use(router.allowedMethods());
};
