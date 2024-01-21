// Import necessary controllers, middleware, and utilities
const authenticationController = require('../controllers/authentication');
const bookController = require('../controllers/books');
const orderController = require('../controllers/order')
const authMiddleware = require('../middleware/authMiddleware');
const errorHandler = require('../utilities/errorHandler')


module.exports = (app) => {

    // Login/Register user
    app.post('/register', authenticationController.register);
    app.post('/login', authenticationController.login);

    // Handle crud operation for books
    app.post('/book', authMiddleware, bookController.createBooks);
    app.get('/books', bookController.getBooks);
    app.get('/book/:id', authMiddleware, bookController.getBookById);
    app.put('/book', authMiddleware, bookController.updateBookById);
    app.delete('/book/:id', authMiddleware, bookController.deleteBookById);

    // Handle Order related operations
    app.post('/cart', authMiddleware, orderController.addToCart);
    app.get('/cart/:userId', authMiddleware, orderController.getCartByUserId);
    app.delete('/cart/:id', authMiddleware, orderController.deleteCartById);
    app.post('/order', authMiddleware, orderController.placeOrder);
    app.get('/order/:userId', authMiddleware, orderController.orderHistory);

    // Handle 404 Pages
    app.all('*', errorHandler.error);
};
