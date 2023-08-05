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
  debugLog("Received get all request for payment");
  return outgoingFormat(await paymentRepo.findAll());
};

// -------------------
// find by id
// -------------------

const findById = async (paymentId) => {
  debugLog(`Received get by id request for payment ${paymentId}`);
  // Find the payment
  paymentFound = await paymentRepo.findById(paymentId);
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
  return outgoingFormat(await paymentRepo.findByUserId(userId));
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findByUserId,
};
