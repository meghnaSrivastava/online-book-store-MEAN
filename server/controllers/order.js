// Import necessary modules and constants
const orderDao = require('../dao/order');
const { MESSAGE, HTTP_STATUS_CODES } = require('../utilities/constants');

// Controller function to handle adding a book to the cart
async function addToCart(req, res) {
    try {
        // Check if the book is already in the cart
        let cart = await orderDao.checkBookInCart(req.body);
        
        if (cart) {
            // If the book is already in the cart, return a success response with a message
            return res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.ALREADY_IN_CART });
        }
        
        // If the book is not in the cart, proceed to add it
        await orderDao.addToCart(req.body);
        res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.ADDED_TO_CART });
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle getting the cart for a user
async function getCartByUserId(req, res) {
    try {
        // Get the cart for the specified user
        let response = await orderDao.getCartByUserId(req.params.userId);
        res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle deleting a cart entry by ID
async function deleteCartById(req, res) {
    try {
        // Delete the cart entry by ID
        await orderDao.deleteCartById(req.params.id);
        res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGE.REMOVED_FROM_CART });
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle placing an order
async function placeOrder(req, res) {
    try {
        // Place an order and get the response
        let response = await orderDao.placeOrder(req.body);
        await orderDao.clearCart(req.body.userId);
        res.status(HTTP_STATUS_CODES.OK).json({ orderId: response._id });
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Controller function to handle retrieving order history for a user
async function orderHistory(req, res) {
    try {
        // Get order history for the specified user
        let response = await orderDao.orderHistory(req.params.userId);
        console.log(response,"ds")
        res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
        // Handle unexpected errors
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGE.UNEXPECTED_ERROR });
    }
}

// Export the controller functions for use in your application
module.exports = {
    addToCart,
    getCartByUserId,
    deleteCartById,
    placeOrder,
    orderHistory
};
