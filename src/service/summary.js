const summaryRepo = require('../repository/summary');
const { getLogger } = require('../core/logging');
const ServiceError = require('../core/serviceError');
const { spawn } = require('child_process');
const { formatOutgoingSummary, formatIncomingSummary, formatIncomingFile } = require('./_formats');
const config = require('config');
const pythonPath = config.get('process.path');

// -------------------
// Logging
// -------------------
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

// -------------------
// Get all
// -------------------
const getAll = async () => {
  debugLog('Fetching all summaries');
  let summaries = await summaryRepo.findAll();
  summaries = summaries.map(formatOutgoingSummary);
  const count = summaries.length;
  return {
    summaries,
    count,
  };
};

// -------------------
// Get by id
// -------------------
const getById = async (summaryId) => {
  debugLog(`Fetching summary with id ${summaryId}`);
  const summary = await summaryRepo.findById(summaryId);
  return formatOutgoingSummary(summary);
};

// -------------------
// Create
// -------------------
const create = async (fileObject) => {
  const file = formatIncomingFile(fileObject);
  debugLog(`Creating new summary based on ${JSON.stringify(file.name)}`);
  // TODO: Create this function
  // Call the python script
  
  const pythonProcess = spawn('python', [pythonPath, file.path, file.encoding, file.mimetype, file.name, file.size]);
  // Handle the output/error events of the Python process
  pythonProcess.stdout.on('data', (data) => {
    // Handle the output from the Python script
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    // Handle any error output from the Python script
    console.error(`Error from Python script: ${data}`);
  });

  // Wait for the Python process to exit
  await new Promise((resolve) => {
    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      resolve();
    });
  });
  return file;
};

// -------------------
// Post
// -------------------
const post = async (summaryObject) => {
  let summary = formatIncomingSummary(summaryObject);
  debugLog(`Posting new summary with title: ${summary.name}`);
  const summaryId = await summaryRepo.create(summary);
  return getById(summaryId);
};

// -------------------
// Update by id
// -------------------
const updateById = async (summaryId, summaryObject) => {
  debugLog(`Updating summary with id ${summaryId}, new: ${JSON.stringify(summaryObject)}`);
  let summary = formatIncomingSummary(summaryObject);
  const existingSummary = await summaryRepo.findById(summaryId);
  if (!existingSummary) {
    throw ServiceError.notFound(`Summary with summaryId ${summaryId} doesn't exist.`);
  }
  await summaryRepo.update(summaryId, summary);
  return getById(summaryId);
};

// -------------------
// Delete by id
// -------------------
const deleteById = async (summaryId) => {
  debugLog(`Deleting summary with id ${summaryId}`);
  const summary = await summaryRepo.findById(summaryId);
  if (!summary) {
    throw ServiceError.notFound(`Summary with summaryId ${summaryId} doesn't exist.`);
  }
  try {
    await summaryRepo.deleteById(summaryId);
  } catch (err) {
    throw ServiceError.internalServerError('Could not delete summary');
  }
};

// -------------------
// Exports
// -------------------
module.exports = {
  getAll,
  getById,
  create,
  post,
  updateById,
  deleteById,
  formatOutgoingSummary,
};
