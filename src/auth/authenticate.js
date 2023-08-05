// File that contains the authentication logic

// UserService
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const jwt = require("jsonwebtoken");

const config = require("config");
const { findByEmail } = require("../repository/user");
const JWT_SECRET = config.get("jwt.secret");
const JWT_EXPIRES_IN = config.get("jwt.expiresIn");

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
      email: user.email,
      user_id: user.user_id,
      role_id: user.role_id,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
  return token;
};

module.exports = async function (userObject) {
  // Check the password
  debugLog(`Authenticating user: ${JSON.stringify(userObject)}`);
  let user = userObject;
  // Check if  the user exists
  let userFound = await findByEmail(user.email);
  if (!userFound) {
    throw new ServiceError("Mail not found", 401);
  }
  // Check if the password is correct
  if (userFound.password !== user.password) {
    throw new ServiceError("Invalid password", 401);
  }

  // Create the token
  return { token: createToken(userFound), message: "Auth successful" };
};
