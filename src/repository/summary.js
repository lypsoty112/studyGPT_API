const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  try {
    return await getKnex().select().from(tables.summary).orderBy("summary_id");
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (summaryId) => {
  try {
    return await getKnex()
      .select()
      .from(tables.summary)
      .where({ summary_id: summaryId })
      .first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// create
// ------------------------------------
const create = async (summaryObject) => {
  try {
    return (await getKnex()(tables.summary).insert(summaryObject))[0];
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// update
// ------------------------------------
const update = async (summaryId, summaryObject) => {
  try {
    return await getKnex()(tables.summary)
      .where({ summary_id: summaryId })
      .update(summaryObject);
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (summaryId) => {
  try {
    await getKnex()(tables.summary).where({ summary_id: summaryId }).del();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// Find by user id
// ------------------------------------
const findByUserId = async (userId) => {
  try {
    return await getKnex()
      .select()
      .from(tables.summary)
      .where({ user_id: userId });
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
