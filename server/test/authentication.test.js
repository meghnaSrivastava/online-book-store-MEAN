const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index');
const { expect } = chai;

chai.use(chaiHttp);

describe('Authentication Controller', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/register')
        .send({
          firstName:'Test',
          lastName:'User',
          email: 'test@example.com',
          password: 'testpassword',
          role:'user'
        });

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('User Registered Successfully');
    });

    it('should return a conflict status if the email already exists', async () => {
      // Assuming the email 'test@example.com' already exists in the database
      const res = await chai
        .request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: 'testpassword',
        });

      expect(res).to.have.status(409);
      expect(res.body.message).to.equal('Email address is already in use');
    });

    // Add more test cases as needed
  });

  describe('POST /login', () => {
    it('should authenticate a user and return a JWT token', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'testpassword',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('user');
      expect(res.body).to.have.property('jwt');
    });

    it('should return unauthorized status if the user is not found', async () => {
      // Assuming the email 'nonexistent@example.com' doesn't exist in the database
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'testpassword',
        });

      expect(res).to.have.status(401);
      expect(res.body.message).to.equal('User not found.');
    });

  });
});
