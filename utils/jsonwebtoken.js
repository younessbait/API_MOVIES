const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
exports.sign = (payload) => {
  return jsonwebtoken.sign(payload, secret, { expiresIn });
};
exports.verify = (token) => {
  try {
    return jsonwebtoken.verify(token, secret);
  } catch (err) {
    return false;
  }
};
