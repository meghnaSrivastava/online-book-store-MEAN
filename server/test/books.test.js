const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index');
const Book = require('../models/Books');
const { expect } = chai;

chai.use(chaiHttp);
console.log(process.env.NODE_ENV, "process.env.NODE_ENV")
describe('Book Controller', () => {
  // Test book object for creation and update
  const testBook = {
    title: 'The Shining',
    author: 'Stephen King',
    genre: 'Horror',
    price: 20,
    ratings: 4,
    imageUrl: 'https://images.penguinrandomhouse.com/cover/9780307743657',
  };

  let createdBookId;

  // Test case for book creation
  describe('POST /books', () => {
    it('should create a new book', async () => {
      const res = await chai
        .request(app)
        .post('/book')
        .send(testBook);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Book saved successfully');
      createdBookId = res.body.data._id;

      // Verify the book is stored in the database
      const createdBook = await Book.findById(createdBookId);
      expect(createdBook).to.exist;
      expect(createdBook.title).to.equal(testBook.title);
    });

  });

  // Test case for getting all books
  describe('GET /books', () => {
    it('should get all books', async () => {
      const res = await chai
        .request(app)
        .get('/books');

      expect(res).to.have.status(200);
    });
  });

  // Test case for getting a book by ID
  describe('GET /book/:id', () => {
    it('should get a book by ID', async () => {
      const res = await chai
        .request(app)
        .get(`/book/${createdBookId}`);

      expect(res).to.have.status(200);
    });
  });

  // Test case for updating a book by ID
  describe('PUT /books/:id', () => {
    it('should update a book by ID', async () => {
      const updatedBook = { ...testBook, title: 'The Shining V2', _id: createdBookId };
      const res = await chai
        .request(app)
        .put(`/book`)
        .send(updatedBook);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Book updated successfully');

      // Verify the book is updated in the database
      const updatedBookInDB = await Book.findById(createdBookId);
      expect(updatedBookInDB).to.exist;
      expect(updatedBookInDB.title).to.equal('The Shining V2');
    });
  });

  // Test case for deleting a book by ID
  describe('DELETE /books/:id', () => {
    it('should delete a book by ID', async () => {
      const res = await chai
        .request(app)
        .delete(`/book/${createdBookId}`);

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Book deleted successfully');

      // Verify the book is deleted from the database
      const deletedBook = await Book.findById(createdBookId);
      expect(deletedBook).to.not.exist;
    });
  });

});
