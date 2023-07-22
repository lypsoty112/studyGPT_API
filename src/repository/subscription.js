const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return getKnex()(tables.subscription).select().orderBy('subscription_id');
}

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (subscriptionId) => {
  try {
    return getKnex()(tables.subscription).select().where('subscription_id', subscriptionId).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}

// ------------------------------------
// create
// ------------------------------------
const create = async (subscriptionObject) => {
  try {
    const result = await getKnex()(tables.subscription).insert(
      subscriptionObject
    );
    return result[0];
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error creating subscription with values ${JSON.stringify(subscriptionObject)}`, err);
    throw err;
  }
}

// ------------------------------------
// update
// ------------------------------------
const update = async (subscriptionId, subscriptionObject) => {
  try {
    await getKnex()(tables.subscription).where('subscription_id', subscriptionId).update(subscriptionObject);
    return subscriptionId;
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error updating subscription with id ${subscriptionId}`, err);
    throw err;
  }
}

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (subscriptionId) => {
  try {
    await getKnex()(tables.subscription).where('subscription_id', subscriptionId).del();
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error deleting subscription with id ${subscriptionId}`, err);
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
