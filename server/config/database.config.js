// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Set the mongoose promise to use the global promise
mongoose.Promise = global.Promise;

// Export a function that takes a connection string and database name
module.exports = (connectionString, dbName) => {
    // Connect to MongoDB using the provided connection string and database name
    mongoose.connect(`${connectionString}${dbName}`);

    // Get the mongoose connection object
    let db = mongoose.connection;

    // Once the connection is open, execute the callback
    db.once('open', (err) => {
        // If there is an error during the connection, throw it
        if (err) {
            throw err;
        }

        // Log a message indicating that MongoDB is ready
        console.log('MongoDB is ready!');
    });

};
