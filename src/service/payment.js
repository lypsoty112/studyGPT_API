const paymentRepo = require("../repository/payment");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const outgoingFormat = ({
  payment_id,
  amount,
  currency,
  payment_date,
  subscription_id,
  user_id,
  description,
  price,
  title,
}) => {
  // Add a data & status field to the object
  return {
    id: payment_id,
    amount,
    currency,
    date: payment_date,
    subscription: {
      id: subscription_id,
      description,
      price,
      title,
    },
    user_id,
  };
};

// -------------------
// find all
// -------------------
const findAll = async () => {
  debugLog("Received get all request for payment");
  const payments = await paymentRepo.findAll();
  return payments.map(outgoingFormat);
};

// -------------------
// find by id
// -------------------

const findById = async (paymentId) => {
  debugLog(`Received get by id request for payment ${paymentId}`);
  // Find the payment
  const paymentFound = await paymentRepo.findById(paymentId);
  // If the payment doesn't exist, throw a 404
  if (!paymentFound) {
    throw ServiceError.notFound(`payment ${paymentId} not found`);
  }

  return outgoingFormat(paymentFound);
};

// -------------------
// create
// -------------------
const create = async (paymentObject) => {
  debugLog(
    `Received create request for payment ${JSON.stringify(paymentObject)}`
  );
  await paymentRepo.create(paymentObject);
  return findById(paymentObject.payment_id);
};

// -------------------
// update
// -------------------
const update = async (id, paymentObject) => {
  debugLog(
    `Received update request for payment ${JSON.stringify(paymentObject)}`
  );
  // Find the payment
  let paymentFound = await paymentRepo.findById(id);
  // If the payment doesn't exist, throw a 404
  if (!paymentFound) {
    throw ServiceError.notFound(`payment ${id} not found`);
  }
  // Update the payment
  await paymentRepo.update(id, paymentObject);
  return findById(id);
};

// -------------------
// delete
// -------------------
const deleteById = async (paymentId) => {
  debugLog(`Received delete request for payment ${paymentId}`);
  // Find the payment
  let paymentFound = await paymentRepo.findById(paymentId);
  // If the payment doesn't exist, throw a 404
  if (!paymentFound) {
    throw ServiceError.notFound(`payment ${paymentId} not found`);
  }
  // Delete the payment
  await paymentRepo.deleteById(paymentId);
};

// -------------------
// find by user id
// -------------------
const findByUserId = async (userId) => {
  debugLog(`Received get by user id request for payment ${userId}`);
  const payments = await paymentRepo.findByUserId(userId);
  return payments.map(outgoingFormat);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findByUserId,
};
