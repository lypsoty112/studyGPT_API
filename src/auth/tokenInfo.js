const { decryptNumber } = require("./encryption");

const getTokenInfo = (ctx) => {
  return {
    user_id: decryptNumber(ctx.state.user.user_id),
    role_id: decryptNumber(ctx.state.user.role_id),
  };
};

module.exports = {
  getTokenInfo,
};
