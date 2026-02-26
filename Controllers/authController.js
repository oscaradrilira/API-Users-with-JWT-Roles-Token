const User = require("./../models/userModels");
const { comparePassword } = require("./../helpers/password_hash");
const { generateToken } = require("./../helpers/generateToken");

//login a user
// riceve email e password
exports.loginUser = (req, res) => async () => {
    try {
        const { password } = req.body;
        const user = await User.getByEmail(req.body.email);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        //check password
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        //generate token
        const token = generateToken(user);

        res.status(200).json({ message: "User logged in successfully", token: token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in user" });
    }
};

//logout a user
//pending
exports.logoutUser = (req, res) => async () => {
    try {
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error logging out user" });
    }
};