const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  try {
    return await getKnex()(tables.user).select().orderBy("user_id");
  } catch (err) {
    getLogger().error(`Error in userRepo.findAll: ${err}`);
    throw err;
  }
};

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (userId) => {
  try {
    return await getKnex()(tables.user)
      .select()
      .where("user_id", userId)
      .first();
  } catch (err) {
    getLogger().error(`Error in userRepo.findById: ${err}`);
    throw err;
  }
};

// ------------------------------------
// create
// ------------------------------------
const create = async (userObject) => {
  try {
    return (await getKnex()(tables.user).insert(userObject))[0];
  } catch (err) {
    getLogger().error(`Error in userRepo.create: ${err}`);
    throw err;
  }
};

// ------------------------------------
// update
// ------------------------------------
const update = async (userId, userObject) => {
  try {
    return await getKnex()(tables.user)
      .update(userObject)
      .where("user_id", userId);
  } catch (err) {
    getLogger().error(`Error in userRepo.update: ${err}`);
    throw err;
  }
};

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (userId) => {
  try {
    return await getKnex()(tables.user).del().where("user_id", userId);
  } catch (err) {
    getLogger().error(`Error in userRepo.deleteById: ${err}`);
    throw err;
  }
};

// ------------------------------------
// Find by email
// ------------------------------------
const findByEmail = async (email) => {
  try {
    return await getKnex()(tables.user).select().where("email", email).first();
  } catch (err) {
    getLogger().error(`Error in userRepo.findByEmail: ${err}`);
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
  findByEmail,
};
