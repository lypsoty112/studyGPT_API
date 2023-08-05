const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  try {
    return await getKnex().select().from(tables.payment).orderBy("payment_id");
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (paymentId) => {
  try {
    return await getKnex()
      .select()
      .from(tables.payment)
      .where({ payment_id: paymentId })
      .first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// create
// ------------------------------------
const create = async (paymentObject) => {
  try {
    await getKnex()(tables.payment).insert(paymentObject);
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// update
// ------------------------------------
const update = async (paymentId, paymentObject) => {
  try {
    await getKnex()(tables.payment)
      .where({ payment_id: paymentId })
      .update(paymentObject);
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (paymentId) => {
  try {
    await getKnex()(tables.payment).where({ payment_id: paymentId }).del();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// find by user id
// ------------------------------------
const findByUserId = async (userId) => {
  try {
    return await getKnex()
      .select()
      .from(tables.payment)
      .where({ user_id: userId })
      .orderBy("payment_id");
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
  findByUserId,
};
