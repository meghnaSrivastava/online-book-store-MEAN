const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

// Import configuration and database setup
const CONFIG = require('./config/config');
require('./config/database.config')(CONFIG['connectionString'], CONFIG['dbName']);

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON requests and URL-encoded data
app
    .use(bodyParser.json({ limit: "1mb", extended: true }))
    .use(express.urlencoded({ extended: true, limit: "1mb" }));

// Set up routes by passing the Express app to the routes module
require('./routes/routes')(app);

// Start the server and listen on the specified port and hostname
app.listen(CONFIG.port, CONFIG.hostName, () => {
    console.log(`Server running on http://${CONFIG.hostName}:${CONFIG.port}/`);
});

// Export the app and server for testing
module.exports = { app };