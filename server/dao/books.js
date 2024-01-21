// Import necessary model
const books = require("../models/Books");

// Function to create a new book
async function createBooks(data) {
    // Use the 'books' model to create a new book with the provided data
    return await books.create(data);
}

// Function to get a list of books based on a query
async function getBooks(query) {
    // Check if a keyword is provided in the query
    if (query && query.keyword) {
        // Use the 'books' model to find books that match the keyword in title, author, genre, or ratings
        return await books.find({
            $or: [
                { title: { $regex: query.keyword, $options: 'i' } },
                { author: { $regex: query.keyword, $options: 'i' } },
                { genre: { $regex: query.keyword, $options: 'i' } },
                { ratings: { $regex: query.keyword, $options: 'i' } }
            ]
        });
    } else {
        // If no keyword is provided, return all books
        return await books.find();
    }
}

// Function to get a single book by its ID
async function getBookById(id) {
    // Use the 'books' model to find a book by its ID
    return await books.findOne({ _id: id });
}

// Function to update a book by its ID
async function updateBookById(data) {
    // Use the 'books' model to update a book based on the provided data
    return await books.updateOne({ _id: data._id }, data);
}

// Function to delete a book by its ID
async function deleteBookById(id) {
    // Use the 'books' model to delete a book based on its ID
    return await books.deleteOne({ _id: id });
}

// Export the functions for use in your application
module.exports = {
    createBooks,
    getBooks,
    getBookById,
    updateBookById,
    deleteBookById
};
