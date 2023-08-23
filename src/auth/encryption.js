const config = require("config");
const ENCRYPTION_KEY = config.get("encryption.key");

function encryptNumber(number) {
  return number ^ ENCRYPTION_KEY; // XOR operation for encryption
}

function decryptNumber(encryptedNumber) {
  return encryptedNumber ^ ENCRYPTION_KEY; // XOR operation for decryption
}

module.exports = {
  encryptNumber,
  decryptNumber,
};
