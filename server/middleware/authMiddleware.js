const jwt = require("jsonwebtoken");
const secret = require("../secretKey");

module.exports = function (req, res, next) {
   const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secret.key);
    req.user = decoded.user; // Ensure this matches the structure of your token payload
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
