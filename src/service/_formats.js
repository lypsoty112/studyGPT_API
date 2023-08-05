// -------------------
// Currency
// -------------------

const formatOutgoingCurrency = (currency) => {
  if (!currency) throw ServiceError.notFound("Currency does not exist");
  if (currency === undefined)
    throw ServiceError.notFound("Currency does not exist");
  return {
    currencyId: currency.currency_id,
    name: currency.name,
    symbol: currency.symbol,
  };
};

const formatIncomingCurrency = (currency) => {
  if (!currency) return null;
  if (currency === undefined) return null;
  return {
    name: currency.name,
    symbol: currency.symbol,
  };
};

// -------------------
// Parameter
// -------------------

const formatOutgoingParameter = (parameter) => {
  if (!parameter) throw ServiceError.notFound("Parameter does not exist");
  if (parameter === undefined)
    throw ServiceError.notFound("Parameter does not exist");
  return {
    parameterId: parameter.parameter_id,
    name: parameter.name,
    default: Boolean(parameter.default),
  };
};

const formatIncomingParameter = (parameter) => {
  if (!parameter) return null;
  if (parameter === undefined) return null;
  return {
    name: parameter.name,
    default: parameter.default,
  };
};

// -------------------
// Payment
// -------------------
const formatOutgoingPayment = (payment) => {
  if (!payment) throw ServiceError.notFound("Payment does not exist");
  if (payment === undefined)
    throw ServiceError.notFound("Payment does not exist");
  return {
    paymentId: payment.payment_id,
    subscriptionId: payment.subscription_id,
    userId: payment.user_id,
    date: Math.floor(new Date(payment.date).getTime() / 1000),
    amount: payment.amount,
    currencyId: payment.currency_id,
    statusId: payment.status_id,
    description: payment.description,
  };
};

const formatIncomingPayment = (payment) => {
  if (!payment) return null;
  if (payment === undefined) return null;
  return {
    subscription_id: payment.subscriptionId,
    user_id: payment.userId,
    date: new Date(payment.date * 1000),
    amount: payment.amount,
    currency_id: payment.currencyId,
    status_id: payment.statusId,
    description: payment.description,
  };
};

// -------------------
// Status
// -------------------
const formatOutgoingStatus = (status) => {
  if (!status) throw ServiceError.notFound("Status does not exist");
  if (status === undefined)
    throw ServiceError.notFound("Status does not exist");
  return {
    statusId: status.status_id,
    name: status.name,
  };
};

const formatIncomingStatus = (status) => {
  if (!status) return null;
  if (status === undefined) return null;
  return {
    name: status.name,
  };
};

// -------------------
// Subscription
// -------------------
const formatOutgoingSubscription = (subscription) => {
  if (!subscription) throw ServiceError.notFound("Subscription does not exist");
  if (subscription === undefined)
    throw ServiceError.notFound("Subscription does not exist");
  return {
    subscriptionId: subscription.subscription_id,
    name: subscription.name,
    price: subscription.price,
    currencyId: subscription.currency_id,
    duration: subscription.duration,
    description: subscription.description,
  };
};

const formatIncomingSubscription = (subscription) => {
  if (!subscription) return null;
  if (subscription === undefined) return null;
  return {
    name: subscription.name,
    price: subscription.price,
    currency_id: subscription.currencyId,
    duration: subscription.duration,
    description: subscription.description,
  };
};

// -------------------
// Summary
// -------------------
const formatOutgoingSummary = (summary) => {
  if (!summary) throw ServiceError.notFound("Summary does not exist");
  if (summary === undefined)
    throw ServiceError.notFound("Summary does not exist");
  return {
    summaryId: summary.summary_id,
    userId: summary.user_id,
    dateCreated: summary.date_created,
    dateModified: summary.date_modified,
    content: summary.content,
    name: summary.name,
    description: summary.description,
  };
};

const formatIncomingSummary = (summary) => {
  if (!summary) return null;
  if (summary === undefined) return null;
  return {
    user_id: summary.userId,
    date_created: summary.dateCreated,
    date_modified: summary.dateModified,
    content: summary.content,
    name: summary.name,
    description: summary.description,
  };
};

const formatIncomingFile = (file) => {
  if (!file) return null;
  if (file === undefined) return null;
  console.log(file);
  return {
    name: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    size: file.size,
    path: file.path,
    filename: file.filename,
    destination: file.destination,
  };
};
// -------------------
// User
// -------------------
const formatOutgoingUser = (user) => {
  if (!user) throw ServiceError.notFound("User does not exist");
  if (user === undefined) throw ServiceError.notFound("User does not exist");
  return {
    userId: user.user_id,
    subscriptionId: user.subscription_id,
    email: user.email,
    password: user.password,
    registrationDate: user.registration_date,
  };
};

const formatIncomingUser = (user) => {
  if (!user) return null;
  if (user === undefined) return null;
  return {
    subscription_id: user.subscriptionId,
    email: user.email,
    password: user.password,
    registration_date: user.registrationDate,
  };
};

// -------------------
// Exports
// -------------------
module.exports = {
  formatOutgoingCurrency,
  formatIncomingCurrency,
  // -------------------
  formatOutgoingParameter,
  formatIncomingParameter,
  // -------------------
  formatOutgoingPayment,
  formatIncomingPayment,
  // -------------------
  formatOutgoingStatus,
  formatIncomingStatus,
  // -------------------
  formatOutgoingSubscription,
  formatIncomingSubscription,
  // -------------------
  formatOutgoingSummary,
  formatIncomingSummary,
  formatIncomingFile,
  // -------------------
  formatOutgoingUser,
  formatIncomingUser,
};
