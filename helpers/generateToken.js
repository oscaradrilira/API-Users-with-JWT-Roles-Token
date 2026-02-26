const jwt = require("jsonwebtoken");

exports.generateToken = (userData) => {
    const { id } = userData;
    const payload = id;
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: "1m"
    }
    const token = jwt.sign(payload, secret, options);
    return token;
}