/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('users', () => {
  describe('GET /api/v1/users', () => {
    // Test to get all user in database
    it('should get all users from the database', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('POST /api/v1/users', () => {
    // Post user in database
    it('post user to database', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .set('content-type', 'application/json')
        .send({
          user_name: 'user_name',
          first_name: 'first_name',
          last_name: 'last_name',
          email: 'testuser@gmail.com',
          password: '1@dD1T39',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
    // Activate user account
    it('activate account', (done) => {
      chai.request(server)
        .get('/api/v1/users/activate/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    // Login User
    it('login user', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .set('content-type', 'application/json')
        .send({
          email: 'testuser@gmail.com',
          password: '1@dD1T39',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
