// Create a file middleware/adminAuthMiddleware.js

const jwt = require("jsonwebtoken");
const secret = require("../secretKey"); // Your secret key file

const adminAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, secret.key, (err, decoded) => {
    if (err || decoded.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    req.user = decoded;
    next();
  });
};

module.exports = adminAuthMiddleware;
