// Import necessary modules and models
const cart = require("../models/Cart");
const order = require("../models/Orders");
const mongoose = require('mongoose');

// Function to add a book to the cart
async function addToCart(data) {
    // Use the 'cart' model to create a new cart entry with the provided data
    return await cart.create(data);
}

// Function to check if a book is already in the cart
async function checkBookInCart(data) {
    // Use the 'cart' model to find a cart entry based on userId and bookId
    return await cart.findOne({ userId: data.userId, bookId: data.bookId });
}

// Function to get the cart for a specific user with book details
async function getCartByUserId(userId) {
    // Use the 'cart' model to aggregate and retrieve cart details for a user, including book details
    return await cart.aggregate([
        {
            $match: {
                userId:  new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "bookId",
                foreignField: "_id",
                as: "book"
            }
        },
        {
            $unwind: "$book"
        },
        {
            $project: {
                book: 1,
                _id: 1 
            }
        },
    ]);
}

// Function to delete a cart entry by ID
async function deleteCartById(id) {
    // Use the 'cart' model to delete a cart entry based on the provided ID
    return await cart.deleteOne({ _id: id });
}

// Function to place an order
async function placeOrder(data) {
    // Use the 'order' model to create a new order with the provided data
    return await order.create(data);
}

// Function to retrieve order history for a specific user with user, book, and order details
async function orderHistory(userId) {
    // Use the 'order' model to aggregate and retrieve order history details for a user, including user, book, and order details
    return await order.aggregate([
        {
            $match: {
                "userId": new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $lookup: {
                from: "books",
                localField: "bookIds",
                foreignField: "_id",
                as: "books"
            }
        },
        {
            $project: {
                "orderStatus": 1,
                "mode": 1,
                "userId" : 1,
                "books._id":1,
                "books.title": 1,
                "books.author": 1,
                "books.price": 1,
                "amount":1,
                "createdAt": 1,
                "updatedAt": 1,
            }
        }
    ]);
}

// Function to clear the cart after order has been placed
async function clearCart(userId) {
    
    // Use the 'cart' model to delete a cart entry based on the provided userId
    return await cart.deleteMany({ userId: userId });
 }

// Export the functions for use in your application
module.exports = {
    addToCart,
    checkBookInCart,
    getCartByUserId,
    deleteCartById,
    placeOrder,
    orderHistory,
    clearCart
};
