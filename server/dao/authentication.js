// Import the User model
const user = require("../models/User");

// Async function to register a new user
async function register(data) {
    // Use the create method to add a new user to the database
    return await user.create(data);
}

// Async function to log in a user based on their email
async function login(email) {
    // Use the findOne method to find a user by their email in the database
    return await user.findOne({ email });
}

// Export the register and login functions as part of the module
module.exports = {
    register,
    login
};
