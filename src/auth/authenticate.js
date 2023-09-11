// File that contains the authentication logic

// UserService
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const jwt = require("jsonwebtoken");

const config = require("config");
const { findByEmail, findById } = require("../repository/user");
const JWT_SECRET = config.get("jwt.secret");
const JWT_REFRESH_SECRET = config.get("jwt.refresh.secret");
const JWT_EXPIRES_IN = config.get("jwt.expiresIn");
const JWT_REFRESH_EXPIRES_IN = config.get("jwt.refresh.expiresIn");
const bcrypt = require("bcryptjs");
const { getTokenInfo } = require("./tokenInfo");
const { encryptNumber, decryptNumber } = require("./encryption");

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const createToken = (user) => {
  const token = jwt.sign(
    {
      user_id: encryptNumber(user.user_id),
      role_id: encryptNumber(user.role_id),
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
  return token;
};

const createRefreshToken = (user) => {
  const token = jwt.sign(
    {
      user_id: encryptNumber(user.user_id),
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    }
  );

  return token;
};

// -------------------

// Role validation
// -------------------
const validateRoles = (roles) => {
  // Possible roles:
  // 1: admin
  // 2: customer (enterprise)
  // 3: customer (private)
  return async function (ctx, next) {
    if (!roles) await next();
    const tokenInfo = getTokenInfo(ctx);
    if (roles.includes(tokenInfo.role_id)) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = { message: "Forbidden" };
    }
  };
};

const authenticate = async function (userObject) {
  // Check the password
  debugLog(`Authenticating user: ${JSON.stringify(userObject)}`);
  let user = userObject;
  // Check if  the user exists
  let userFound = await findByEmail(user.email);
  if (!userFound) {
    throw ServiceError.notFound(`user ${user.email} not found`);
  }
  // Check if the password is correct
  if (!bcrypt.compareSync(user.password, userFound.password)) {
    throw ServiceError.unauthorized("Invalid password");
  }

  // Create the token
  return [
    {
      token: createToken(userFound),
      message: "Auth successful",
    },
    createRefreshToken(userFound),
  ];
};

const authenticateRefreshToken = async function (refreshToken) {
  debugLog(`Authenticating user: ${JSON.stringify(refreshToken)}`);
  // Validate the refresh token
  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      throw ServiceError.unauthorized("Invalid refresh token");
    }
  });
  // Get the user
  let user = jwt.decode(refreshToken);
  // Check if  the user exists (by id)
  let userFound = await findById(decryptNumber(user.user_id));
  if (!userFound) {
    throw ServiceError.notFound(`user ${user.email} not found`);
  }

  // Return the token
  return {
    token: createToken(userFound),
    message: "Auth successful",
  };
};

module.exports.validateRoles = validateRoles;
module.exports.authenticate = authenticate;
module.exports.authenticateRefreshToken = authenticateRefreshToken;
module.exports.roles = {
  admin: [1],
  customer: [2, 3],
  enterprise: [2],
  private: [3],
};
