const jwt = require("jsonwebtoken");

exports.generateAccessToken = (userData) => {
  return jwt.sign({ id: userData.id_user }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

exports.generateRefreshToken = (userData) => {
  return jwt.sign({ id: userData.id_user }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });
};
