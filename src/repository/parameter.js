const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return getKnex()(tables.parameter).select().orderBy('parameter_id');
}

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (parameterId) => {
  try {
    return getKnex()(tables.parameter).select().where('parameter_id', parameterId).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}

// ------------------------------------
// create
// ------------------------------------
const create = async (parameterObject) => {
  try {
    const result = await getKnex()(tables.parameter).insert(parameterObject);
    return result[0];
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error creating parameter with values ${JSON.stringify(parameterObject)}`, err);
    throw err;
  }
}

// ------------------------------------
// update
// ------------------------------------
const update = async (parameterId, parameterObject) => {
  try {
    await getKnex()(tables.parameter).where('parameter_id', parameterId).update(parameterObject);
    return parameterId;
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error updating parameter with id ${parameterId}`, err);
    throw err;
  }
}

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (parameterId) => {
  try {
    await getKnex()(tables.parameter).where('parameter_id', parameterId).del();
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error deleting parameter with id ${parameterId}`, err);
    throw err;
  }
};

// ------------------------------------
// exports
// ------------------------------------
module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById
};
