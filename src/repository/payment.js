const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return getKnex()(tables.payment).select().orderBy('date');
}

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (paymentId) => {
  try {
    return getKnex()(tables.payment).select().where('payment_id', paymentId).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}

// ------------------------------------
// find by user id
// ------------------------------------
const findByUserId = async (userId) => {
  try {
    return getKnex()(tables.payment).select().where('user_id', userId).orderBy('date');
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}
// ------------------------------------
// create
// ------------------------------------
const create = async (paymentObject) => {
  try {
    const result = await getKnex()(tables.payment).insert(paymentObject);
    // Get the payment_id of the newly created payment
    return result[0];
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error creating payment with values ${JSON.stringify(paymentObject)}`, err);
    throw err;
  }
}

// ------------------------------------
// update
// ------------------------------------
const update = async (paymentId, paymentObject) => {
  try {
    await getKnex()(tables.payment).where('payment_id', paymentId).update(paymentObject);
    return paymentId;
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error updating payment with id ${paymentId}`, err);
    throw err;
  }
}

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (paymentId) => {
  try {
    await getKnex()(tables.payment).where('payment_id', paymentId).del();
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error deleting payment with id ${paymentId}`, err);
    throw err;
  }
};

// ------------------------------------
// exports
// ------------------------------------
module.exports = {
  findAll,
  findById,
  findByUserId,
  create,
  update,
  deleteById
};
