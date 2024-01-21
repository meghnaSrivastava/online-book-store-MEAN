const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const { HTTP_STATUS_CODES, MESSAGE } = require('../utilities/constants'); // Import constants

// Middleware for verifying JWT token
module.exports = (req, res, next) => {

    try {
        if (process.env.NODE_ENV == 'test') {
            return next();
        }

        const token = req.header('x-auth-token');

        // If no token is provided, return unauthorized error
        if (!token) {
            return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ error: MESSAGE.NO_TOKEN_PROVIDED });
        }
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, CONFIG.jwtSecret);

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        // If token verification fails, return unauthorized error
        res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ error: MESSAGE.INVALID_TOKEN });
    }
};
