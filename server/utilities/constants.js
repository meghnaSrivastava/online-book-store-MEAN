// User roles constants
const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

// Token expiration time constant
const TOKEN_EXPIRATION = '1h';

// Error message constants
const ERROR_MESSAGE = {
    NOT_FOUND: 'Page not found',
};

// Message constants for various scenarios
const MESSAGE = {
    EMAIL_ALREADY_EXIST : "Email address is already in use",
    REGISTERED : "User Registered Successfully",
    USER_NOT_FOUND: 'User not found.',
    WRONG_PASSWORD: 'Entered password is wrong.',
    UNEXPECTED_ERROR: 'Unexpected error occurred during login.',
    NO_TOKEN_PROVIDED: 'Unauthorized, no token provided.',
    INVALID_TOKEN: 'Unauthorized, invalid token.',
    BOOK_SAVED: 'Book saved successfully',
    BOOK_UPDATED: 'Book updated successfully',
    BOOK_DELETED: 'Book deleted successfully',
    ADDED_TO_CART: 'Book added successfully.',
    ALREADY_IN_CART: 'Book already present in the cart.',
    REMOVED_FROM_CART: 'Book removed from cart.'
};

// HTTP status code constants
const HTTP_STATUS_CODES = {
    OK: 200,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    CONFLICT: 409,
};

// Export constants for use in your application
module.exports = {
    USER_ROLES,
    MESSAGE,
    HTTP_STATUS_CODES,
    ERROR_MESSAGE,
    TOKEN_EXPIRATION
};
