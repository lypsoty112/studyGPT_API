const Koa = require("koa");
const koaCors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const emoji = require("node-emoji");
const { serializeError } = require("serialize-error");
const { getLogger, initializeLogger } = require("./core/logging");
const ServiceError = require("./core/serviceError");
const { initializeData, shutdown } = require("./data");
const installRest = require("./rest");

const config = require("config");
const { checkJwtToken } = require("./core/auth");
const CORS_ORIGINS = config.get("cors.origins");
const CORS_MAX_AGE = config.get("cors.maxAge");
const NODE_ENV = config.get("env");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");

module.exports = async function createServer() {
  // Start with the logger
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });
  const logger = getLogger();

  // Initialize the database
  await initializeData();

  // CORS
  const app = new Koa();
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        return CORS_ORIGINS[0];
      },
      allowHeaders: ["Accept", "Content-Type", "Authorization"],
      maxAge: CORS_MAX_AGE,
    })
  );

  // Authorization
  app.use(checkJwtToken());

  // Body parser
  app.use(bodyParser());

  // Add emojis
  app.use(async (ctx, next) => {
    const logger = getLogger(); // Create the logger
    logger.info(`${emoji.get("fast_forward")} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get("skull");
      if (ctx.status >= 400) return emoji.get("x");
      if (ctx.status >= 300) return emoji.get("rocket");
      if (ctx.status >= 200) return emoji.get("white_check_mark");
      return emoji.get("rewind");
    };

    try {
      await next();

      logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`);
    } catch (error) {
      logger.error(`${emoji.get("x")} ${ctx.method} ${ctx.status} ${ctx.url}`, {
        error,
      });

      throw error;
    }
  });

  // Service Error
  app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.body = {
          code: "NOT_FOUND",
          message: `Unknown resource: ${ctx.url}`,
        };
        ctx.status = 404;
      }
    } catch (error) {
      const logger = getLogger();
      logger.error("Error occurred while handling a request", {
        error: serializeError(error),
      });

      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== "production" ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }

        if (error.isValidationFailed) {
          statusCode = 400;
        }

        if (error.isUnauthorized) {
          statusCode = 401;
        }

        if (error.isForbidden) {
          statusCode = 403;
        }

        if (error.isConflict) {
          statusCode = 409;
        }
        if (error.isInternalServerError) {
          statusCode = 500;
        }
      }

      if (ctx.state.jwtOriginalError) {
        statusCode = 401;
        errorBody.code = "UNAUTHORIZED";
        errorBody.message = ctx.state.jwtOriginalError.message;
        errorBody.details.jwtOriginalError = serializeError(
          ctx.state.jwtOriginalError
        );
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  installRest(app);

  return {
    getApp() {
      return app;
    },
    start() {
      return new Promise((resolve) => {
        const port = config.get("port");
        app.listen(port);
        logger.info(`🚀 Server listening on http://localhost:${port}`);
        resolve();
      });
    },
    async stop() {
      {
        app.removeAllListeners();
        await shutdown();
        getLogger().info("👋 Server stopped");
      }
    },
  };
};
