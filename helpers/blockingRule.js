const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    message: {
        error: "Too many login attempts from this IP. Please try again in 1 minute."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;