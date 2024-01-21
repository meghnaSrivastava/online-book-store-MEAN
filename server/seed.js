const { MongoClient } = require('mongodb');
const CONFIG = require('./config/config');
const booksData = require('./utilities/bookData');

// Collection name
const collectionName = 'books';

// Create a MongoClient
const client = new MongoClient(CONFIG['connectionString']);

async function seedDatabase() {
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select the database and collection
        const db = client.db(CONFIG['dbName']);
        const collection = db.collection(collectionName);

        // Delete everything from the collection
        const deleteResult = await collection.deleteMany({});
        console.log(`${deleteResult.deletedCount} documents deleted from the collection.`);

        // Insert the collection of books into MongoDB
        const result = await collection.insertMany(booksData);

        // Print the number of inserted documents
        console.log(`${result.insertedCount} books inserted.`);

        // Fetch all data from the collection
        const allBooks = await collection.find({}).toArray();

        // Print all fetched data
        console.log('All Books:');
        console.log(allBooks.length);
        const userCollection = db.collection('users');

        // Add an admin user
        const adminUser = {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@gmail.com',
            password: '$2b$10$8AUqNnRYj83u7S7WMauDv.UrLnDjVL0JSt5JNhY/FIiCVT7zvo7CW', //Admin@123
            role: 'admin', // Assuming 'admin' is one of the roles defined in USER_ROLES
        };

        // Create the admin user using the User model
        await userCollection.insertOne(adminUser);
        console.log('Admin user added.');
    } catch (error) {
        console.log(error)
    } finally {
        // Close the connection when done
        await client.close();
    }
}

// Call the function to seed the database
seedDatabase();