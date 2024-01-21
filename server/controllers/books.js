// Import necessary modules and constants
const bookDao = require('../dao/books');
const { MESSAGE, HTTP_STATUS_CODES } = require('../utilities/constants');

// Controller function to handle book creation
async function createBooks(req, res) {
    try {
        // Call DAO method to create books
        let data = await bookDao.createBooks(req.body);
        // Send success response
        res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.BOOK_SAVED, data: data });
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle getting all books
async function getBooks(req, res) {
    try {
        // Call DAO method to get books with optional query parameters
        let response = await bookDao.getBooks(req.query);
        // Send success response with retrieved books
        res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle getting a book by ID
async function getBookById(req, res) {
    try {
        // Call DAO method to get a book by ID
        let response = await bookDao.getBookById(req.params.id);
        // Send success response with the retrieved book
        res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle updating a book by ID
async function updateBookById(req, res) {
    try {
        // Call DAO method to update a book by ID
        let response = await bookDao.updateBookById(req.body);
        // Send success response
        res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.BOOK_UPDATED });
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle deleting a book by ID
async function deleteBookById(req, res) {
    try {
        // Call DAO method to delete a book by ID
        let response = await bookDao.deleteBookById(req.params.id);
        // Send success response
        res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.BOOK_DELETED });
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Export the controller functions for use in your application
module.exports = {
    createBooks,
    getBooks,
    getBookById,
    updateBookById,
    deleteBookById
};
