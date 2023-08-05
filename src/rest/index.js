// Router
const Router = require("@koa/router");

const userRouter = require("./_user");
const summaryRouter = require("./_summary");
const parameterRouter = require("./_parameter");
const paymentRouter = require("./_payment");
const subscriptionRouter = require("./_subscription");
const healthRouter = require("./_health");

module.exports = (app) => {
  const router = new Router({ prefix: "/api" });

  // Register routers
  userRouter(router);
  summaryRouter(router);
  parameterRouter(router);
  paymentRouter(router);
  subscriptionRouter(router);
  healthRouter(router);

  // Register routes
  app.use(router.routes()).use(router.allowedMethods());
};
