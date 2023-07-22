const parameterRepo = require('../repository/parameter');
const { getLogger } = require('../core/logging');
const ServiceError = require('../core/serviceError');
const { formatOutgoingParameter, formatIncomingParameter } = require('./_formats');

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
  debugLog('Fetching all parameters');
  let parameters = await parameterRepo.findAll();
  parameters = parameters.map(formatOutgoingParameter);
  const count = parameters.length;
  return {
    parameters,
    count,
  };
};

// -------------------
// Get by id
// -------------------
const getById = async (parameterId) => {
  debugLog(`Fetching parameter with id ${parameterId}`);
  const parameter = await parameterRepo.findById(parameterId);
  return formatOutgoingParameter(parameter);
};

// -------------------
// Create
// -------------------
const create = async (parameterObject) => {
  debugLog(`Creating new parameter with values: ${JSON.stringify(parameterObject)}`);
  let parameter = formatIncomingParameter(parameterObject);
  const existingParameter = await parameterRepo.findByName(parameter.name);
  if (existingParameter) {
    throw ServiceError.conflict('Parameter already exists');
  } else {
    try {
      const parameterId = await parameterRepo.create(parameter);
      return getById(parameterId);
    } catch (err) {
      const logger = getLogger();
      logger.error('Could not create parameter', err);
      throw ServiceError.internal('Could not create parameter');
    }
  }
};

// -------------------
// Update
// -------------------
const updateById = async (parameterId, parameterObject) => {
  debugLog(`Updating parameter with id ${parameterId}, new values: ${JSON.stringify(parameterObject)}`);
  let parameter = formatIncomingParameter(parameterObject);
  let foundParameter = await parameterRepo.findById(parameterId);
  if (!foundParameter) {
    throw ServiceError.notFound(`Parameter with parameterId ${parameterId} doesn't exist.`);
  }
  const existingParameterByName = await parameterRepo.findByName(parameter.name);
  if (existingParameterByName && existingParameterByName.parameterId !== parameterId) {
    throw ServiceError.conflict(`Parameter with name ${parameter.name} already exists.`);
  }
  await parameterRepo.update(parameterId, parameter);
  return getById(parameterId);
};

// -------------------
// Delete
// -------------------
const deleteById = async (parameterId) => {
  debugLog(`Deleting parameter with id ${parameterId}`);
  const parameter = await parameterRepo.findById(parameterId);
  if (!parameter) {
    throw ServiceError.notFound(`Parameter with parameterId ${parameterId} doesn't exist.`);
  }
  try {
    await parameterRepo.deleteById(parameterId);
  } catch (err) {
    throw ServiceError.internalServerError('Could not delete parameter');
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
