const { HTTP_STATUS_CODES, ERROR_MESSAGE } = require('../utilities/constants'); // Import constants


// Error handling function
module.exports = {
    error: (req, res) => {
        // Send a JSON response with a 404 status code and a custom error message
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
            message: ERROR_MESSAGE.NOT_FOUND
        });
    }
};
