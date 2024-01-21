const mongoose = require('mongoose');

const OBJECT_ID = mongoose.Schema.Types.ObjectId;
// Define the Mongoose schema for the Cart model
const cartSchema = new mongoose.Schema({
    userId: {  type: OBJECT_ID, ref: 'User' }, 
    bookId: {  type: OBJECT_ID, ref: 'Books' },  
});

// Export the User model
module.exports = mongoose.model('Cart', cartSchema);
