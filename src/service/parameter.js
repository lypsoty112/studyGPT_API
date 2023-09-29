const parameterRepo = require("../repository/parameter");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/*parameter_id: 9,
  command: 'cmd9',
  description: 'Description for parameter 9',
  name: 'Parameter 9',
  parameter_class_id: 5,
  class_command: 'cmd5',
  class_description: 'Description for command 5',
  class_name: 'Parameter Class 5',
  class_selectionType: 'Type B */

const outgoingFormat = ({
  class_id,
  class_name,
  class_description,
  selection_type,
  allow_empty,
  parameter_id,
  name,
  description,
}) => {
  return {
    id: parameter_id,
    description,
    name,
    class: {
      id: class_id,
      description: class_description,
      name: class_name,
      selectionType: selection_type,
      allow_empty: allow_empty,
    },
  };
};

// -------------------
// find all
// -------------------
const findAll = async () => {
  debugLog("Received get all request for parameter");
  const parameters = await parameterRepo.findAll();
  return parameters.map(outgoingFormat);
};

// -------------------
// find by id
// -------------------

const findById = async (parameterId) => {
  debugLog(`Received get by id request for parameter ${parameterId}`);
  // Find the parameter
  const parameter = await parameterRepo.findById(parameterId);
  // If the parameter doesn't exist, throw a 404
  if (!parameter) {
    throw ServiceError.notFound(`parameter ${parameterId} not found`);
  }

  return outgoingFormat(parameter);
};

// -------------------
// create
// -------------------
const create = async (parameterObject) => {
  debugLog(`Received create request for parameter ${parameterObject.name}`);
  return findById(await parameterRepo.create(parameterObject));
};

// -------------------
// update
// -------------------
const update = async (id, parameterObject) => {
  // Find the parameter
  const parameter = await parameterRepo.findById(id);
  // If the parameter doesn't exist, throw a 404
  if (!parameter) {
    throw ServiceError.notFound(`parameter ${id} not found`);
  }
  // Update the parameter
  await parameterRepo.update(id, parameterObject);
  return outgoingFormat(await parameterRepo.findById(id));
};

// -------------------
// delete
// -------------------
const deleteById = async (parameterId) => {
  // Find the parameter
  const parameter = await parameterRepo.findById(parameterId);
  // If the parameter doesn't exist, throw a 404
  if (!parameter) {
    throw ServiceError.notFound(`parameter ${parameterId} not found`);
  }
  // Delete the parameter
  await parameterRepo.deleteById(parameterId);
  return;
};

//

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
