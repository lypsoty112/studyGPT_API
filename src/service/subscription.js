const subscriptionRepo = require('../repository/subscription');
const { getLogger } = require('../core/logging');
const ServiceError = require('../core/serviceError');
const { formatOutgoingSubscription, formatIncomingSubscription } = require('./_formats');

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
  debugLog('Fetching all subscriptions');
  let subscriptions = await subscriptionRepo.findAll();
  subscriptions = subscriptions.map(formatOutgoingSubscription);
  const count = subscriptions.length;
  return {
    subscriptions,
    count,
  };
};

// -------------------
// Get by id
// -------------------
const getById = async (subscriptionId) => {
  debugLog(`Fetching subscription with id ${subscriptionId}`);
  const subscription = await subscriptionRepo.findById(subscriptionId);
  return formatOutgoingSubscription(subscription);
};

// -------------------
// Create
// -------------------
const create = async (subscriptionObject) => {
  debugLog(`Creating new subscription: ${JSON.stringify(subscriptionObject)}`);
  let subscription = formatIncomingSubscription(subscriptionObject);
  try {
    const subscriptionId = await subscriptionRepo.create(subscription);
    return getById(subscriptionId);
  } catch (err) {
    const logger = getLogger();
    logger.error('Could not create subscription', err);
    throw ServiceError.internalServerError('Could not create subscription');
  }
};

// -------------------
// Update
// -------------------
const updateById = async (subscriptionId, subscriptionObject) => {
  debugLog(`Updating subscription with id ${subscriptionId}, new values: ${JSON.stringify(subscriptionObject)}`);
  let subscription = formatIncomingSubscription(subscriptionObject);
  const existingSubscription = await subscriptionRepo.findById(subscriptionId);
  if (!existingSubscription) {
    throw ServiceError.notFound(`Subscription with subscriptionId ${subscriptionId} doesn't exist.`);
  }
  await subscriptionRepo.update(subscriptionId, subscription);
  return getById(subscriptionId);
};

// -------------------
// Delete
// -------------------
const deleteById = async (subscriptionId) => {
  debugLog(`Deleting subscription with id ${subscriptionId}`);
  const existingSubscription = await subscriptionRepo.findById(subscriptionId);
  if (!existingSubscription) {
    throw ServiceError.notFound(`Subscription with subscriptionId ${subscriptionId} doesn't exist.`);
  }
  try {
    await subscriptionRepo.deleteById(subscriptionId);
  } catch (err) {
    throw ServiceError.internalServerError('Could not delete subscription');
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
