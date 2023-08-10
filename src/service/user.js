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

const outgoingFormat = (object) => {
  // Add a data & status field to the object
  // Remove the password
  // Check if object is a list or a single object
  if (Array.isArray(object)) {
    // If it's a list, map each object
    object = object.map((user) => {
      // Get the subscription id
      delete user.password;
      // Set the subscription data in a data field
      user.subscription = {
        subscription_id: user.subscription_id,
        description: user.description,
        title: user.title,
        price: user.price,
      };
      // Remove the subscription id
      delete user.subscription_id;
      // Remove the subscription fields
      delete user.title;
      delete user.description;
      delete user.price;
      // Return the user
      return user;
    });
  } else {
    // If it's a single object, simply remove the password
    delete object.password;
    object.subscription = {
      subscription_id: object.subscription_id,
      description: object.description,
      title: object.title,
      price: object.price,
    };
    // Remove the subscription id
    delete object.subscription_id;
    // Remove the subscription fields
    delete object.title;
    delete object.description;
    delete object.price;
    // Return the user
    return object;
  }

  return {
    data: object,
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
  return outgoingFormat(await userRepo.findAll());
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
