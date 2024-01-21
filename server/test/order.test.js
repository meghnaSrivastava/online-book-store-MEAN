const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index');
const User = require('../models/User'); 
const Book = require('../models/Books'); 
const { expect } = chai;

chai.use(chaiHttp);

describe('Order Controller', () => {
  let testUser; 
  let testBook;
  let createdOrderId;

  // Before the test suite runs, fetch a user with the role 'user' and a book from the database
  before(async () => {
    testUser = await User.findOne({ role: 'user' });
    testBook = await Book.findOne();
  });

  // Test case for adding a book to the cart
  describe('POST /addToCart', () => {
    it('should add a book to the cart', async () => {
      const res = await chai
        .request(app)
        .post('/cart')
        .send({ userId: testUser._id, bookId: testBook._id });

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Book added successfully.');
    });

  });

  // Test case for getting the cart by user ID
  describe('GET /getCartByUserId/:userId', () => {
    it('should get the cart by user ID', async () => {
      const res = await chai
        .request(app)
        .get(`/cart/${testUser._id}`);

      expect(res).to.have.status(200);
    });
  });

  // Test case for placing an order
  describe('POST /placeOrder', () => {
    it('should place an order', async () => {
      const testOrder = {
        userId: testUser._id,
        bookIds: [testBook._id],
        amount:20
      };

      const res = await chai
        .request(app)
        .post('/order')
        .send(testOrder);

      expect(res).to.have.status(200);
      expect(res.body.orderId).to.exist;
      createdOrderId = res.body.orderId;
    });

  });

   // Test case for deleting a cart entry by ID
   describe('DELETE /deleteCartById/:id', () => {
    it('should delete a cart entry by ID', async () => {
      const res = await chai
        .request(app)
        .delete(`/cart/${createdOrderId}`);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Book removed from cart.');
    });
  });

  // Test case for retrieving order history by user ID
  describe('GET /orderHistory/:userId', () => {
    it('should retrieve order history by user ID', async () => {
      const res = await chai
        .request(app)
        .get(`/order/${testUser._id}`);

      expect(res).to.have.status(200);
    });
  });

});
