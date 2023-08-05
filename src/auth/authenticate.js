// File that contains the authentication logic

// UserService
const { getByEmail } = require("../service/user");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const jwt = require("jsonwebtoken");

const config = require("config");
const JWT_SECRET = config.get("jwt.secret");
const JWT_EXPIRES_IN = config.get("jwt.expiresIn");

const { formatIncomingUser } = require("../service/_formats");

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
      userId: user.userId,
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
  let user = formatIncomingUser(userObject);
  // Check if  the user exists
  let userFound = await getByEmail(user.email);
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
