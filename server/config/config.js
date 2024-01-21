// Configuration object for various settings
module.exports = {
        // Port on which the server will run
        port: 3000,
    
        // Hostname or IP address on which the server will be accessible
        hostName: '127.0.0.1',
    
        // MongoDB connection string including the default port
        connectionString: 'mongodb://localhost:27017/',
    
        // Name of the MongoDB database
        dbName: 'BookStore',
    
        // Secret key used for JWT (JSON Web Token) encoding and decoding
        jwtSecret: 'super-secret',
    };
    