const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return getKnex()(tables.summary).select().orderBy('summary_id');
}

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (summaryId) => {
  try {
    return getKnex()(tables.summary).select().where('summary_id', summaryId).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}

// ------------------------------------
// create
// ------------------------------------
const create = async (summaryObject) => {
  try {
    const result = await getKnex()(tables.summary).insert(summaryObject);
    return result[0];
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error creating summary with values ${JSON.stringify(summaryObject)}`, err);
    throw err;
  }
}

// ------------------------------------
// update
// ------------------------------------
const update = async (summaryId, summaryObject) => {
  try {
    await getKnex()(tables.summary).where('summary_id', summaryId).update(summaryObject);
    return summaryId;
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error updating summary with id ${summaryId}`, err);
    throw err;
  }
}

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (summaryId) => {
  try {
    await getKnex()(tables.summary).where('summary_id', summaryId).del();
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error deleting summary with id ${summaryId}`, err);
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
