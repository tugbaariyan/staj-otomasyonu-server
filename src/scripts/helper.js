const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const passwordToHash = (password) => {
  return CryptoJS.HmacSHA256(
    password,
    CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH)
  ).toString();
};

const generateAccessToken = (userId) => {
  return JWT.sign({ userId }, process.env.ACCES_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = {
  passwordToHash,
  generateAccessToken,
};
