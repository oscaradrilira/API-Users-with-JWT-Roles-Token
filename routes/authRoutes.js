const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../helpers/jwt");

router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken({ id_user: decoded.id });

    res.json({ accessToken: newAccessToken });
  });
});
