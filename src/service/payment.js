const paymentRepo = require('../repository/payment');
const { getLogger } = require('../core/logging');
const ServiceError = require('../core/serviceError');
const { formatOutgoingPayment, formatIncomingPayment } = require('./_formats');

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
  debugLog('Fetching all payments');
  let payments = await paymentRepo.findAll();
  payments = payments.map(formatOutgoingPayment);
  const count = payments.length;
  return {
    payments,
    count,
  };
};

// -------------------
// Get by id
// -------------------
const getById = async (paymentId) => {
  debugLog(`Fetching payment with id ${paymentId}`);
  const payment = await paymentRepo.findById(paymentId);
  return formatOutgoingPayment(payment);
};

// -------------------
// Get by user id
// -------------------
const getByUserId = async (userId) => {
  debugLog(`Fetching payments for user with id ${userId}`);
  let payments = await paymentRepo.findByUserId(userId);
  payments = payments.map(formatOutgoingPayment);
  const count = payments.length;
  return {
    payments,
    count,
  };
};

// -------------------
// Create
// -------------------
const create = async (paymentObject) => {
  debugLog(`Creating new payment with values: ${JSON.stringify(paymentObject)}`);
  let payment = formatIncomingPayment(paymentObject);
  try {
    const paymentId = await paymentRepo.create(payment);
    return getById(paymentId);
  } catch (err) {
    const logger = getLogger();
    logger.error('Could not create payment', err);
    throw ServiceError.internalServerError('Could not create payment');
  }
};

// -------------------
// Update by id
// -------------------
const updateById = async (paymentId, paymentObject) => {

  debugLog(
    `Updating payment with id ${paymentId}, new values: ${JSON.stringify(paymentObject)}`
  );
  let payment = formatIncomingPayment(paymentObject);
  const foundPayment = await paymentRepo.findById(paymentId);
  if (!foundPayment) {
    throw ServiceError.notFound(`Payment with paymentId ${paymentId} doesn't exist.`);
  }
  await paymentRepo.update(paymentId, payment);
  return getById(paymentId);
};

// -------------------
// Delete by id
// -------------------
const deleteById = async (paymentId) => {
  debugLog(`Deleting payment with id ${paymentId}`);
  const payment = await paymentRepo.findById(paymentId);
  if (!payment) {
    throw ServiceError.notFound(`Payment with paymentId ${paymentId} doesn't exist.`);
  }
  try {
    await paymentRepo.deleteById(paymentId);
  } catch (err) {
    throw ServiceError.internalServerError('Could not delete payment');
  }
};

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  updateById,
  deleteById,
};
