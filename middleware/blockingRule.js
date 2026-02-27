const rateLimit = require('express-rate-limit');
const { sendAlert } = require('../helpers/antiSpam');
const userModel = require('../models/userModels');

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: {
        error: "Too many login attempts from this IP. Please try again in 1 minute."
    },
    handler: async (req, res, next, options) => {
        if (req.rateLimit.current === options.max + 1) {
            const intentEmail = req.body.email;
            const ipCliente = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            if (intentEmail) {
                try {
                    const user = await userModel.getByEmail(intentEmail);
                    if (user) {
                        sendAlert(intentEmail, ipCliente);
                    }
                } catch (error) {
                    res.status(500).json({ error: "Error fetching user" });
                }
            }
        }
        return res.status(429).json({ error: "Too many login attempts from this IP. Please try again in 1 minute." });
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;