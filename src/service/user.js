const userRepo = require("../repository/user");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
/*
  return {
    subscription_id: user.subscriptionId,
    email: user.email,
    password: user.password,
    registration_date: user.registrationDate,
  };*/

/**        user_id: 11,
    date_created: 2023-08-10T18:00:00.000Z,
    email: 'test@studygpt.com',
    password: 'password',
    role_id: 1,
    subscription_id: 1,
    description: 'Free subscription with limited features',
    price: '0.00',
    title: 'Free',
    name: 'admin */

const outgoingFormat = ({
  user_id,
  date_created,
  email,
  password,
  role_id,
  subscription_id,
  description,
  price,
  title,
  name,
}) => {
  return {
    id: user_id,
    date_created,
    email,
    role: {
      id: role_id,
      name,
    },
    subscription: {
      id: subscription_id,
      description,
      price,
      title,
    },
  };
};
// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

// -------------------
// find all
// -------------------
const findAll = async () => {
  debugLog("Received get all request for user");
  const users = await userRepo.findAll();
  return users.map(outgoingFormat);
};

// -------------------
// find by id
// -------------------
const findById = async (userId) => {
  debugLog(`Received get by id request for user ${userId}`);
  // Find the user
  let userFound = await userRepo.findById(userId);
  // If the user doesn't exist, throw a 404
  if (!userFound) {
    throw ServiceError.notFound(`user ${userId} not found`);
  }
  return outgoingFormat(userFound);
};

// -------------------
// create
// -------------------
const create = async (userObject) => {
  debugLog(`Received create request for user ${userObject.email}`);
  // Check if the user already exists
  let userFound = await userRepo.findByEmail(userObject.email);
  // If the user already exists, throw a 409
  if (userFound) {
    throw ServiceError.conflict(`user ${userObject.email} already exists`);
  }
  // Create the user
  return findById(await userRepo.create(userObject));
};

// -------------------
// update
// -------------------
const update = async (id, userObject) => {
  debugLog(`Received update request for user ${id}`);
  // Find the user
  findById(id);
  //  Check if the user already exists
  let userFound = await userRepo.findByEmail(userObject.email);
  // If the user already exists, throw a 409
  if (userFound) {
    throw ServiceError.conflict(`user ${userObject.email} already exists`);
  }
  // Update the user
  await userRepo.update(id, userObject);
  return findById(id);
};

// -------------------
// delete
// -------------------
const deleteById = async (userId) => {
  debugLog(`Received delete request for user ${userId}`);
  // Find the user
  findById(userId);
  // Delete the user
  await userRepo.deleteById(userId);
  return;
};

// -------------------
// find by email
// -------------------
const findByEmail = async (email) => {
  debugLog(`Received get by email request for user ${email}`);
  // Find the user
  let userFound = await userRepo.findByEmail(email);
  // If the user doesn't exist, throw a 404
  if (!userFound) {
    throw ServiceError.notFound(`user ${email} not found`);
  }
  return outgoingFormat(userFound);
};

// Register
// -------------------
const register = async (email, password) => {
  debugLog(`Received register request for user ${email}`);
  // Check if the user already exists
  // Add the necessary fields to the user object
  await create({
    email: email,
    password: password,
    date_created: new Date(),
  });
};

// -------------------
// exports
// -------------------
module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findByEmail,
  register,
};
