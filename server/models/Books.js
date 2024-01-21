const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const STRING = mongoose.Schema.Types.String;
const NUMBER = mongoose.Schema.Types.Number;

// Define the Mongoose schema for the Books model
const bookSchema = new mongoose.Schema({
    title: { type: STRING, },  // Email field with validation
    author: { type: STRING },  // Password field with validation
    genre: { type: STRING },  // User role with enum validation and default value
    price: { type: NUMBER },  // Reference to the Cart model
    rating: { type: NUMBER },  // Array of references to Receipt model
    imageUrl: { type: STRING, },  // Book image URL
});

// Export the User model
module.exports = mongoose.model('Books', bookSchema);
