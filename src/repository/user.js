const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return getKnex()(tables.user).select().orderBy('user_id');
}

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (userId) => {
  try {
    return getKnex()(tables.user).select().where('user_id', userId).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}

// ------------------------------------
// find by email
// ------------------------------------
const findByEmail = async (email) => {
  try {
    return getKnex()(tables.user).select().where('email', email).first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
}
// ------------------------------------
// create
// ------------------------------------
const create = async (userObject) => {
  try {
    const result = await getKnex()(tables.user).insert(userObject);
    return result[0];
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error creating user with values ${JSON.stringify({ email, registration_date })}`, err);
    throw err;
  }
}

// ------------------------------------
// update
// ------------------------------------
const update = async (userId, userObject) => {
  try {
    const result = await getKnex()(tables.user).where('user_id', userId).update(userObject);
    return result[0];
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error updating user with id ${userId}`, err);
    throw err;
  }
}

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (userId) => {
  try {
    await getKnex()(tables.user).where('user_id', userId).del();
  } catch (err) {
    const logger = getLogger();
    logger.error(`Error deleting user with id ${userId}`, err);
    throw err;
  }
};

// ------------------------------------
// exports
// ------------------------------------
module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  deleteById
};
