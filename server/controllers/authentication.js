const jwt = require('jsonwebtoken');
const userDao = require('../dao/authentication');
const CONFIG = require('../config/config');
const { MESSAGE, HTTP_STATUS_CODES,TOKEN_EXPIRATION } = require('../utilities/constants');

// Controller function to handle user registration
async function register(req, res) {
    try {
      // Check if the user already exists based on email
      let user = await userDao.login(req.body.email);
  
      if (user) {
        // If the user already exists, return a conflict response
        return res.status(HTTP_STATUS_CODES.CONFLICT).json({ message: MESSAGE.EMAIL_ALREADY_EXIST });
      }
  
      // If the user doesn't exist, proceed with registration
      await userDao.register(req.body);
      res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.REGISTERED });
    } catch (error) {
        console.log(error)
      // Handle unexpected errors
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

async function login(req,res) {
        try {
            // Destructure email and password from the request body
            const { email, password } = req.body;

            // Find user by email in the database
            const user = await userDao.login(email);

            // If user not found, return authentication failed error
            if (!user) {
                return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGE.USER_NOT_FOUND });
            }

            // Check if the provided password matches the user's hashed password
            const isMatch = await user.comparePassword(password);

            // If password doesn't match, return authentication failed error
            if (!isMatch) {
                return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGE.WRONG_PASSWORD });
            }

            // Generate a JWT token with user information
            const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, CONFIG.jwtSecret, {
                expiresIn: TOKEN_EXPIRATION,
            });

            // Return success response with the generated token
            res.status(HTTP_STATUS_CODES.OK).json({  user:user,jwt:token });
        } catch (error) {
            // Log the error for debugging and return an unexpected error response
            console.error('Login error:', error);
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
        }
}

module.exports = {
    register,
    login   
};
