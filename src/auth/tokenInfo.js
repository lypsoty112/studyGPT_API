const getTokenInfo = (ctx) => {
  return ctx.state.user;
};

module.exports = {
  getTokenInfo,
};
