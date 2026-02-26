const User = require("./../models/userModels");
const { comparePassword } = require("./../helpers/password_hash");
const { generateToken } = require("./../helpers/generateToken");

// login a user
exports.loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.getByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // check password
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // generate token
        const token = generateToken(user);

        //register date loggin
        await User.lastLogin(user.id_user);

        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
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