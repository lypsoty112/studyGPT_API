// Router
const Router = require('@koa/router');

const userRouter = require('./_user');
const summaryRouter = require('./_summary');
const currencyRouter = require('./_currency');
const parameterRouter = require('./_parameter');
const paymentRouter = require('./_payment');
const statusRouter = require('./_status');
const subscriptionRouter = require('./_subscription');
const healthRouter = require('./_health');

module.exports = (app) => {
  const router = new Router({ prefix: '/api' });

  // Register routers
  userRouter(router);
  summaryRouter(router);
  currencyRouter(router);
  parameterRouter(router);
  paymentRouter(router);
  statusRouter(router);
  subscriptionRouter(router);
  healthRouter(router);

  // Register routes
  app.use(router.routes()).use(router.allowedMethods());
};
