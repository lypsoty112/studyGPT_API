const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return await getKnex()(tables.parameter)
    .select()
    .join(
      tables.parameterClass,
      `${tables.parameter}.parameter_class_id`,
      "=",
      `${tables.parameterClass}.parameter_class_id`
    )
    .orderBy("parameter_id");
};

// ------------------------------------
// find by id
// ------------------------------------
const findById = async (parameterId) => {
  try {
    return await getKnex()(tables.parameter)
      .select()
      .join(
        tables.parameterClass,
        `${tables.parameter}.parameter_class_id`,
        "=",
        `${tables.parameterClass}.parameter_class_id`
      )
      .where({ parameter_id: parameterId })
      .first();
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// create
// ------------------------------------
const create = async (parameterObject) => {
  try {
    return (await getKnex()(tables.parameter).insert(parameterObject))[0];
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// update
// ------------------------------------
const update = async (parameterId, parameterObject) => {
  try {
    await getKnex()(tables.parameter)
      .where({ parameter_id: parameterId })
      .update(parameterObject);
  } catch (err) {
    getLogger().error(err);
    throw err;
  }
};

// ------------------------------------
// delete
// ------------------------------------
const deleteById = async (parameterId) => {
  try {
    await getKnex()(tables.parameter)
      .where({ parameter_id: parameterId })
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
