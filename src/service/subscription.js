const subscriptionRepo = require("../repository/subscription");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

// -------------------
// Logging
// -------------------

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const outgoingFormat = (object) => {
  // Add a data & status field to the object
  return {
    data: object,
  };
};

// -------------------
// find all
// -------------------
const findAll = async () => {
  debugLog("Received get all request for subscription");
  return outgoingFormat(await subscriptionRepo.findAll());
};

// -------------------
// find by id
// -------------------
const findById = async (subscriptionId) => {
  debugLog(`Received get by id request for subscription ${subscriptionId}`);
  // Find the subscription
  let subscriptionFound = await subscriptionRepo.findById(subscriptionId);
  // If the subscription doesn't exist, throw a 404
  if (!subscriptionFound) {
    throw ServiceError.notFound(`subscription ${subscriptionId} not found`);
  }
  return outgoingFormat(subscriptionFound);
};

// -------------------
// create
// -------------------
const create = async (subscriptionObject) => {
  debugLog(
    `Received create request for subscription ${JSON.stringify(
      subscriptionObject
    )}`
  );
  return findById(await subscriptionRepo.create(subscriptionObject));
};

// -------------------
// update
// -------------------
const update = async (subscription_id, subscriptionObject) => {
  debugLog(
    `Received update request for subscription ${JSON.stringify(
      subscriptionObject
    )}`
  );

  // Find the subscription
  let subscriptionFound = await subscriptionRepo.findById(subscription_id);
  // If the subscription doesn't exist, throw a 404
  if (!subscriptionFound) {
    throw ServiceError.notFound(`subscription ${subscription_id} not found`);
  }
  // Update the subscription
  await subscriptionRepo.update(subscription_id, subscriptionObject);
  return findById(subscription_id);
};

// -------------------
// delete
// -------------------
const remove = async (subscriptionId) => {
  debugLog(`Received delete request for subscription ${subscriptionId}`);
  // Find the subscription
  let subscriptionFound = await subscriptionRepo.findById(subscriptionId);
  // If the subscription doesn't exist, throw a 404
  if (!subscriptionFound) {
    throw ServiceError.notFound(`subscription ${subscriptionId} not found`);
  }
  // Delete the subscription
  await subscriptionRepo.deleteById(subscriptionId);
  return;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
