const User = require("./../models/userModels");
const { comparePassword } = require("./../helpers/password_hash");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./../helpers/generateToken");

// login a user
exports.loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.getByEmail(email);
    const IPClient = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // check password
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // generate token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //register date loggin
    await User.lastLogin(user.id_user, IPClient);

    res.status(200).json({
      message: "User logged in successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user.id_user,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

// logout a user
exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging out user" });
  }
};
//validate new access token by refresh token
exports.validateNewAccessToken = (req, res) => {
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
}
