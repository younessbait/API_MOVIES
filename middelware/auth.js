const jsonwebtoken = require("../utils/jsonwebtoken");
exports.check = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token?.replace("Bearer", "")?.trim();
  const payload = jsonwebtoken.verify(token);
  if (payload) {
    req.userId = payload.sub;
    return next();
  }
  res.status(401).json({ message: "Unauthorized ❎" });
};
