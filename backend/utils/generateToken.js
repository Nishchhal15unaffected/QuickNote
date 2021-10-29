const jwt = require("jsonwebtoken");
const secret = process.env.JWt_SECRET || "nish123";
const generateToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};
module.exports = generateToken;
