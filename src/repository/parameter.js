const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

// ------------------------------------
// find all
// ------------------------------------
const findAll = async () => {
  return await getKnex()(tables.parameter)
    .select(
      `${tables.parameterClass}.class_id as class_id`,
      `${tables.parameterClass}.name as class_name`,
      `${tables.parameterClass}.description as class_description`,
      `${tables.parameterClass}.selection_type as selection_type`,
      `${tables.parameterClass}.allow_empty as allow_empty`,
      `${tables.parameter}.parameter_id`,
      `${tables.parameter}.name`,
      `${tables.parameter}.description`
    )
    .join(
      tables.parameterClass,
      `${tables.parameter}.class_id`,
      "=",
      `${tables.parameterClass}.class_id`
    )
    .where({
      [`${tables.parameterClass}.implemented`]: 1,
      [`${tables.parameter}.implemented`]: 1,
    })
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
        `${tables.parameter}.class_id`,
        "=",
        `${tables.parameterClass}.class_id`
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
