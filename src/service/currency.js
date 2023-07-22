const currencyRepo = require('../repository/currency');
const { getLogger } = require('../core/logging');
const ServiceError = require('../core/serviceError');
const { formatOutgoingCurrency, formatIncomingCurrency } = require('./_formats');

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
  debugLog('Fetching all currencies');
  let currencies = await currencyRepo.findAll();
  currencies = currencies.map(formatOutgoingCurrency);
  const count = currencies.length;
  return {
    currencies,
    count,
  };
};

// -------------------
// Get by id
// -------------------
const getById = async (currencyId) => {
  debugLog(`Fetching currency with id ${currencyId}`);
  let currency = await currencyRepo.findById(currencyId);
  return formatOutgoingCurrency(currency);
};

// -------------------
// Create
// -------------------
const create = async (currencyObject) => {
  debugLog(`Creating new currency with values: ${JSON.stringify(currencyObject)}`);
  let currency = formatIncomingCurrency(currencyObject);
  const existingCurrency = await currencyRepo.findByName(currency.name);
  if (existingCurrency) {
    throw ServiceError.conflict('Currency already exists');
  } else {
    try {
      const currencyId = await currencyRepo.create(currency);
      return getById(currencyId);
    } catch (err) {
      const logger = getLogger();
      logger.error('Could not create currency', err);
      throw ServiceError.internal('Could not create currency');
    }
  }
};

// -------------------
// Update
// -------------------
const updateById = async (currencyId, currencyObject) => {
  debugLog(`Updating currency with id ${currencyId}, new values: ${JSON.stringify(currencyObject)}`);
  let currency = formatIncomingCurrency(currencyObject);
  const foundCurrency = await currencyRepo.findById(currencyId);
  if (!foundCurrency) {
    throw ServiceError.notFound(`Currency with currencyId ${currencyId} doesn't exist.`);
  }
  const existingCurrencyByName = await currencyRepo.findByName(currency.name);
  if (existingCurrencyByName && existingCurrencyByName.currencyId !== currencyId) {
    throw ServiceError.conflict(`Currency with name ${currency.name} already exists.`);
  }
  await currencyRepo.update(currencyId, currency);
  return getById(currencyId);
};

// -------------------
// Delete
// -------------------
const deleteById = async (currencyId) => {
  debugLog(`Deleting currency with id ${currencyId}`);
  const currency = await currencyRepo.findById(currencyId);
  if (!currency) {
    throw ServiceError.notFound(`Currency with currencyId ${currencyId} doesn't exist.`);
  } 
  try {
    await currencyRepo.deleteById(currencyId);
  } catch (err) {
    throw ServiceError.internalServerError('Could not delete currency');
  }
};

// -------------------
// Exports
// -------------------
module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
