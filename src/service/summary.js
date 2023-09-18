const summaryRepo = require("../repository/summary");
const parameterService = require("./parameter");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const { spawn } = require("child_process");
const config = require("config");
const { debug } = require("console");
const ai_api = config.get("ai.api");

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

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
  debugLog(`Creating new summary based on ${JSON.stringify(file)}`);
  // Create the body for the AI API

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
  formData.append("title", "Test");
  formData.append("description", "test");
  formData.append("parameters", "[1, 3, 5]");
  formData.append("user_id", 1);
  // File value:  {"fieldname":"file","originalname":"Betaling .pdf","encoding":"7bit","mimetype":"application/pdf","destination":"data/uploads","filename":"300d3ad43cc4d0e253085f0e7b5a7cde","path":"data\\uploads\\300d3ad43cc4d0e253085f0e7b5a7cde","size":14925}
  // Send the actual blob

  const fileBlob = new Blob([file], { type: file.mimetype });
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
