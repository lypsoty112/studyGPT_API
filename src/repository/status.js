const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return getKnex()(tables.status).select().orderBy('status_id');
}

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (statusId) => {
  try {
    return getKnex()(tables.status).select().where('status_id', statusId).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}

// ------------------------------------
// create
// ------------------------------------
const create = async (statusObject) => {
  try {
    await getKnex()(tables.status).insert(statusObject);
    const status = await findById(statusId);
    return status.status_id;
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error creating status with values ${JSON.stringify(statusObject)}`, err);
    throw err;
  }
}

// ------------------------------------
// update
// ------------------------------------
const update = async (statusId, statusObject) => {
  try {
    await getKnex()(tables.status).where('status_id', statusId).update(statusObject);
    return statusId;
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error updating status with id ${statusId}`, err);
    throw err;
  }
}

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (statusId) => {
  try {
    await getKnex()(tables.status).where('status_id', statusId).del();
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error deleting status with id ${statusId}`, err);
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
