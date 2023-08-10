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

const outgoingFormat = (object) => {
  // Add a data & status field to the object
  return {
    data: object,
  };
};
// -------------------
// find all
// -------------------
const findAll = async () => {
  debugLog("Received get all request for summary");
  return outgoingFormat(await summaryRepo.findAll());
};

// -------------------
// find by id
// -------------------
const findById = async (summaryId) => {
  debugLog(`Received get by id request for summary ${summaryId}`);
  // Find the summary
  let summaryFound = await summaryRepo.findById(summaryId);
  // If the summary doesn't exist, throw a 404
  if (!summaryFound) {
    throw ServiceError.notFound(`summary ${summaryId} not found`);
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
const newSummary = async (incomingObject, file) => {
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
  return findById(1);
};

// -------------------
// Find by user id
// -------------------
const findByUserId = async (userId) => {
  debugLog(`Received get by user id request for id ${userId}`);
  return outgoingFormat(await summaryRepo.findByUserId(userId));
};

// -------------------
// Find home data by user id
// -------------------
const findHomeDataByUserId = async (userId) => {
  debugLog(`Received get home data by user id request for id ${userId}`);
  return outgoingFormat(await summaryRepo.findHomeDataByUserId(userId));
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
