// File that contains the authentication logic

// UserService
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const jwt = require("jsonwebtoken");

const config = require("config");
const { findByEmail } = require("../repository/user");
const JWT_SECRET = config.get("jwt.secret");
const JWT_EXPIRES_IN = config.get("jwt.expiresIn");
const ENCRYPTION_KEY = config.get("encryption.key");
const bcrypt = require("bcryptjs");
const { getTokenInfo } = require("./tokenInfo");

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

function encryptNumber(number) {
  return number ^ ENCRYPTION_KEY; // XOR operation for encryption
}

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

module.exports = async function (userObject) {
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
  return { token: createToken(userFound), message: "Auth successful" };
};

module.exports.validateRoles = validateRoles;
module.exports.roles = {
  admin: [1],
  customer: [2, 3],
  enterprise: [2],
  private: [3],
};
