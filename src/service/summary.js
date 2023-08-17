const summaryRepo = require("../repository/summary");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");
const { spawn } = require("child_process");
const config = require("config");
const pythonPath = config.get("process.path");

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
const update = async (summary_id, summaryObject) => {
  // Find the summary
  summary_id = base64ToInteger(summary_id);
  findById(summary_id);
  // Update the summary
  await summaryRepo.update(summary_id, summaryObject);
  // Return the updated summary
  return findById(summary_id);
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
  // Call the python script
  /*
  const pythonProcess = spawn("python", [
    pythonPath,
    file.path,
    file.encoding,
    file.mimetype,
    file.name,
    file.size,
  ]);
  // Handle the output/error events of the Python process
  pythonProcess.stdout.on("data", (data) => {
    // Handle the output from the Python script
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    // Handle any error output from the Python script
    console.error(`Error from Python script: ${data}`);
  });

  // Wait for the Python process to exit
  await new Promise((resolve) => {
    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
      resolve();
    });
  });
  */
  // Return the summary
  return findById(integerToBase64(1), user_id);
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
