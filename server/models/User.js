const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {USER_ROLES} = require('../utilities/constants');  // Importing user roles constants

const STRING = mongoose.Schema.Types.String;

// Define the Mongoose schema for the User model
const userSchema = new mongoose.Schema({
    firstName: { type: STRING, required: true },  // First Name field with validation
    lastName: { type: STRING  },  // Last Name field with validation
    email: { type: STRING, required: true, unique: true },  // Email field with validation
    password: { type: STRING, required: true },  // Password field with validation
    role: { type: STRING, enum: Object.values(USER_ROLES), default: USER_ROLES['USER'] },  // User role with enum validation and default value
});

// Middleware to hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
    try {
        const user = this;

        // Check if the password has been modified before hashing
        if (!user.isModified('password')) return next();

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        // Handle any errors during password hashing
        return next(error);
    }
});

// Method to compare a user's password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
