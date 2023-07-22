const statusRepo = require('../repository/status');
const { getLogger } = require('../core/logging');
const ServiceError = require('../core/serviceError');
const { formatOutgoingStatus, formatIncomingStatus } = require('./_formats');

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
  debugLog('Fetching all statuses');
  let statuses = await statusRepo.findAll();
  statuses = statuses.map(formatOutgoingStatus);
  const count = statuses.length;
  return {
    statuses,
    count,
  };
};

// -------------------
// Get by id
// -------------------
const getById = async (statusId) => {
  debugLog(`Fetching status with id ${statusId}`);
  const status = await statusRepo.findById(statusId);
  return formatOutgoingStatus(status);
};

// -------------------
// Create
// -------------------
const create = async (statusObject) => {
  debugLog(`Creating new status with name: ${JSON.stringify(statusObject)}`);
  let status = formatIncomingStatus(statusObject);
  const existingStatus = await statusRepo.findByName(status.name);
  if (existingStatus) {
    throw ServiceError.conflict('Status already exists');
  } else {
    try {
      const statusId = await statusRepo.create(status);
      return getById(statusId);
    } catch (err) {
      const logger = getLogger();
      logger.error('Could not create status', err);
      throw ServiceError.internal('Could not create status');
    }
  }
};

// -------------------
// Update
// -------------------
const updateById = async (statusId, statusObject) => {
  debugLog(`Updating status with id ${statusId}: ${JSON.stringify(statusObject)}`);
  let status = formatIncomingStatus(statusObject);
  const foundStatus = await statusRepo.findById(statusId);
  if (!foundStatus) {
    throw ServiceError.notFound(`Status with statusId ${statusId} doesn't exist.`);
  }
  const existingStatusByName = await statusRepo.findByName(status.name);
  if (existingStatusByName && existingStatusByName.statusId !== statusId) {
    throw ServiceError.conflict(`Status with name ${status.name} already exists.`);
  }
  await statusRepo.update(statusId, status);
  return getById(statusId);
};

// -------------------
// Delete
// -------------------
const deleteById = async (statusId) => {
  debugLog(`Deleting status with id ${statusId}`);
  const status = await statusRepo.findById(statusId);
  if (!status) {
    throw ServiceError.notFound(`Status with statusId ${statusId} doesn't exist.`);
  }
  try {
    await statusRepo.deleteById(statusId);
  } catch (err) {
    throw ServiceError.internalServerError('Could not delete status');
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
  formatOutgoingStatus,
};
