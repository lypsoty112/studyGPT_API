const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  try {
    return await getKnex()
      .select()
      .from(tables.subscription)
      .orderBy("subscription_id");
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (subscriptionId) => {
  try {
    return await getKnex()
      .select()
      .from(tables.subscription)
      .where({ subscription_id: subscriptionId })
      .first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// create
// ------------------------------------
const create = async (subscriptionObject) => {
  try {
    return (await getKnex()(tables.subscription).insert(subscriptionObject))[0];
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// update
// ------------------------------------
const update = async (subscriptionId, subscriptionObject) => {
  try {
    await getKnex()(tables.subscription)
      .where({ subscription_id: subscriptionId })
      .update(subscriptionObject);
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (subscriptionId) => {
  try {
    await getKnex()(tables.subscription)
      .where({ subscription_id: subscriptionId })
      .del();
  } catch (err) {
    getLogger().error(err);
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
  deleteById,
};
