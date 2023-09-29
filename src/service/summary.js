const summaryRepo = require("../repository/summary");
const parameterService = require("./parameter");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const { spawn } = require("child_process");
const config = require("config");
const { debug } = require("console");
const ai_api = config.get("ai.api");
const fs = require("fs");
const { Readable } = require("stream");

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

async function checkParameters(parameters) {
  // Get all the parameters
  const allParameters = await parameterService.findAll();
  // Make sure that there's at least one parameter
  if (parameters.length == 0)
    throw ServiceError.validationFailed("No parameters provided");

  // Get the distinct parameter classes based on class id
  let classes = allParameters.map((p) => p.class);
  // Use reduce and Map to extract distinct classes based on id
  classes = Array.from(
    classes.reduce((map, item) => map.set(item.id, item), new Map()).values()
  );

  // Add an array to each class, which will contain the parameter ids
  classes = classes.map((c) => {
    return { class: c, param: [] };
  });
  // Add the parameters to their respective classes
  for (let i = 0; i < allParameters.length; i++) {
    let j = allParameters[i];
    let index = classes.findIndex((c) => c.class.id === j.class.id);
    classes[index].param.push(j);
  }
  for (let i = 0; i < classes.length; i++) {
    let c = classes[i];
    let parametersIncluded = 0;
    for (let j = 0; j < c.param.length; j++) {
      let p = c.param[j];
      if (parameters.find((param) => param === p.id)) {
        parametersIncluded++;
      }
    }
    // Check if the number of parameters included in the class is allowed
    if (parametersIncluded == 0 && c.class.allow_empty == 0) {
      throw ServiceError.validationFailed("Class empty: " + c.class.name);
    }
    if (parametersIncluded > 1 && c.class["selection_type"] == 0) {
      throw ServiceError.validationFailed(
        "Wrong amount of selection: " + c.class.name
      );
    }
  }
}

function integerToBase64(integer) {
  return btoa(
    String.fromCharCode.apply(
      null,
      new Uint8Array(new Int32Array([integer]).buffer)
    )
  );
}

function base64ToInteger(base64) {
  return new Int32Array(
    new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0))
    ).buffer
  )[0];
}

const outgoingFormat = ({
  summary_id,
  content,
  date_created,
  date_modified,
  description,
  title,
  user_id,
}) => {
  // Add a data & status field to the object
  return {
    id: integerToBase64(summary_id),
    content,
    date_created,
    date_modified,
    description,
    title,
    user: {
      id: user_id,
    },
  };
};
// -------------------
// find all
// -------------------
const findAll = async () => {
  debugLog("Received get all request for summary");
  const summaries = await summaryRepo.findAll();
  return summaries.map(outgoingFormat);
};

// -------------------
// find by id
// -------------------
const findById = async (summaryId, user_id) => {
  debugLog(`Received get by id request for summary ${summaryId}`);
  // Find the summary
  let summaryFound = await summaryRepo.findById(base64ToInteger(summaryId));
  // If the summary doesn't exist, throw a 404
  if (!summaryFound) {
    throw ServiceError.notFound(`summary ${summaryId} not found`);
  }
  // If the user is not the owner of the summary, throw a 403
  if (summaryFound.user_id !== user_id) {
    throw ServiceError.forbidden(
      `user ${user_id} is not the owner of summary ${summaryId}`
    );
  }
  return outgoingFormat(summaryFound);
};

// -------------------
// create
// -------------------
const create = async (summaryObject) => {
  debugLog(
    `Received create request for summary ${JSON.stringify(summaryObject)}`
  );
  return findById(await summaryRepo.create(summaryObject));
};

// -------------------
// update
// -------------------
const update = async (summary_id, summaryObject, user_id) => {
  // Find the summary
  findById(summary_id, user_id);
  // Update the summary
  await summaryRepo.update(base64ToInteger(summary_id), summaryObject);
  // Return the updated summary
  return findById(summary_id, user_id);
};

// -------------------
// delete
// -------------------
const deleteById = async (summaryId) => {
  // Find the summary
  findById(summaryId);
  // Delete the summary
  await summaryRepo.deleteById(summaryId);
  return;
};

// -------------------
// newSummary
// -------------------
const newSummary = async (
  { title, description, parameters },
  user_id,
  file
) => {
  // TODO: implement newSummary for summary service
  // Create the summary
  convertedParameters = JSON.parse(parameters);
  // TODO: Check the parameters
  await checkParameters(convertedParameters);

  // Ping the AI API
  const pingResponse = await fetch(ai_api + "/health/ping", {
    method: "GET",
  });
  if (pingResponse.status != 200) {
    throw ServiceError.internalServerError("AI API is not available");
  }
  // Send the file to the AI API
  // This is a form data request
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("parameters", parameters);
  formData.append("user_id", user_id);
  // File value:  {"fieldname":"file","originalname":"Betaling .pdf","encoding":"7bit","mimetype":"application/pdf","destination":"data/uploads","filename":"300d3ad43cc4d0e253085f0e7b5a7cde","path":"data\\uploads\\300d3ad43cc4d0e253085f0e7b5a7cde","size":14925}
  // Send the actual blob
  const fileBuffer = fs.readFileSync(file.path); // Read the file into a buffer
  const fileBlob = new Blob([fileBuffer], { type: file.mimetype }); // Convert the buffer to a Blob

  formData.append("file", fileBlob, file.originalname);

  const fileResponse = await fetch(ai_api + "/ai/create", {
    method: "POST",
    body: formData,
  });
  if (fileResponse.status != 200) {
    throw ServiceError.internalServerError("Something went wrong with the AI");
  }

  const fileResponseJson = await fileResponse.json();
  debugLog(
    `Received response from AI API: ${JSON.stringify(fileResponseJson)}`
  );
  // Get the summary id from the response
  const summary_id = fileResponseJson.data.summary_id;
  return findById(integerToBase64(summary_id), user_id);
};

// -------------------
// Find by user id
// -------------------
const findByUserId = async (userId) => {
  debugLog(`Received get by user id request for id ${userId}`);
  const summaryFound = await summaryRepo.findByUserId(userId);
  return summaryFound.map(outgoingFormat);
};

// -------------------
// Find home data by user id
// -------------------
const findHomeDataByUserId = async (userId) => {
  debugLog(`Received get home data by user id request for id ${userId}`);
  const summaryFound = await summaryRepo.findHomeDataByUserId(userId);
  return summaryFound.map(outgoingFormat);
};

// -------------------
// exports
// -------------------

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  newSummary,
  findByUserId,
  findHomeDataByUserId,
};
