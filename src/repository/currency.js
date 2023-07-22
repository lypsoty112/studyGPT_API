const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return getKnex()(tables.currency).select().orderBy('currency_id');
}
// ------------------------------------
// find by id
// ------------------------------------
const findById = async (currencyId) => {
  try {
    return getKnex()(tables.currency).select().where('currency_id', currencyId).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}

// ------------------------------------
// create
// ------------------------------------
const create = async (currency) => {
  try {
    const result = await getKnex()(tables.currency).insert(currency);
    return result[0];
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error creating currency with values ${JSON.stringify(currency)}`, err);
    throw err;
  }
}

// ------------------------------------
// update
// ------------------------------------
const update = async (currencyId, currency) => {
  try {
    await getKnex()(tables.currency).where('currency_id', currencyId).update(currency);
    return currencyId;
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error updating currency with id ${currencyId}`, err);
    throw err;
  }
}
// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (currencyId) => {
  try {
    await getKnex()(tables.currency).where('currency_id', currencyId).del();
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error deleting currency with id ${currencyId}`, err);
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
