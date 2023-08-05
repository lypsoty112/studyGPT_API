const Joi = require("joi");

// ------------------------------------
// General
// ------------------------------------
const idValidation = Joi.number().integer().positive().required();
// ------------------------------------
// Currency
// ------------------------------------

// ------------------------------------
// Parameter
// ------------------------------------

// ------------------------------------
// Payment
// ------------------------------------
const paymentBodyValidation = {
  subscriptionId: Joi.number().integer().positive().required(),
  userId: Joi.number().integer().positive().required(),
  date: Joi.date().timestamp().required(),
  amount: Joi.number().required(),
  currencyId: Joi.number().integer().positive().required(),
  statusId: Joi.number().integer().positive().required(),
  description: Joi.string().required().allow(""),
};

// ------------------------------------
// Subscription
// ------------------------------------
const subscriptionBodyValidation = {
  name: Joi.string().required(),
  price: Joi.number().required(),
  currencyId: Joi.number().integer().positive().required(),
  duration: Joi.string().required(),
  description: Joi.string().required().allow(""),
};

// ------------------------------------
// Summary
// ------------------------------------
const summaryBodyValidation = {
  userId: Joi.number().integer().positive().required(),
  dateCreated: Joi.date().required(),
  dateModified: Joi.date().required(),
  content: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required().allow(""),
};

// ------------------------------------
// User
// ------------------------------------
const userBodyValidation = {
  subscriptionId: Joi.number().integer().positive().required(),
  email: Joi.string().email().required(),
  registrationDate: Joi.date().required(),
};

const loginBodyValidation = {
  email: userBodyValidation.email,
  password: Joi.string().required(),
};
// ------------------------------------
// Exports
// ------------------------------------

module.exports = {
  // General
  idValidation,
  // Payment
  paymentBodyValidation,
  // Subscription
  subscriptionBodyValidation,
  // Summary
  summaryBodyValidation,
  // User
  userBodyValidation,
  loginBodyValidation,
};
