const userRepo = require("../repository/user");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const { formatOutgoingUser, formatIncomingUser } = require("./_formats");

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

// -------------------
// Get all
// -------------------
const getAll = async () => {
  debugLog("Fetching all users");
  let users = await userRepo.findAll();
  users = users.map(formatOutgoingUser);
  const count = users.length;
  return {
    users,
    count,
  };
};

// -------------------
// Get by id
// -------------------
const getById = async (userId) => {
  debugLog(`Fetching user with id ${userId}`);
  const user = await userRepo.findById(userId);
  return formatOutgoingUser(user);
};

// -------------------
// Create
// -------------------
const create = async (userObject) => {
  debugLog(`Creating new user: ${JSON.stringify(userObject)}`);
  let user = formatIncomingUser(userObject);
  if (await userRepo.findByEmail(user.email)) {
    throw ServiceError.conflict("User already exists");
  } else {
    try {
      const userId = await userRepo.create(user);
      return getById(userId);
    } catch (err) {
      const logger = getLogger();
      logger.error("Could not create user", err);
      throw ServiceError.internalServerError("Could not create user");
    }
  }
};

// -------------------
// Update
// -------------------
const updateById = async (userId, userObject) => {
  debugLog(
    `Updating user with id ${userId}, new ${JSON.stringify(userObject)}`
  );
  let user = formatIncomingUser(userObject);
  const existingUser = await userRepo.findById(userId);
  if (!existingUser) {
    throw ServiceError.notFound(`User with userId ${userId} doesn't exist.`);
  }
  const existingUserByEmail = await userRepo.findByEmail(user.email);
  if (existingUserByEmail && existingUserByEmail.userId !== userId) {
    throw ServiceError.conflict(
      `User with email ${user.email} already exists.`
    );
  }
  await userRepo.update(userId, user);
  return getById(userId);
};

// -------------------
// Delete
// -------------------
const deleteById = async (userId) => {
  debugLog(`Deleting user with id ${userId}`);
  const user = await userRepo.findById(userId);
  if (!user) {
    throw ServiceError.notFound(`User with userId ${userId} doesn't exist.`);
  }
  try {
    await userRepo.deleteById(userId);
  } catch (err) {
    throw ServiceError.internalServerError("Could not delete user");
  }
};

// -------------------
// Exports
// -------------------
module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
