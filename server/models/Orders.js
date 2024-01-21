const mongoose = require('mongoose');
const STRING = mongoose.Schema.Types.String;
const OBJECT_ID = mongoose.Schema.Types.ObjectId;
const NUMBER = mongoose.Schema.Types.Number;

// Define the Mongoose schema for the Orders model
const ordersSchema = new mongoose.Schema({
    userId: {  type: OBJECT_ID, ref: 'User' }, 
    bookIds: {  type: [OBJECT_ID], ref: 'Books' },  
    amount : { type:NUMBER }
},{
    timestamps: true // This will add createdAt and updatedAt fields to your documents
  });

// Export the User model
module.exports = mongoose.model('Orders', ordersSchema);
