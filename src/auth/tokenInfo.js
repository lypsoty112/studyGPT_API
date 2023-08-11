const config = require("config");
const ENCRYPTION_KEY = config.get("encryption.key");

function decryptNumber(encryptedNumber) {
  return encryptedNumber ^ ENCRYPTION_KEY; // XOR operation for decryption
}

const getTokenInfo = (ctx) => {
  return {
    user_id: decryptNumber(ctx.state.user.user_id),
    role_id: decryptNumber(ctx.state.user.role_id),
  };
};

module.exports = {
  getTokenInfo,
};
