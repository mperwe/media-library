// tests/controllers/authController.test.js
const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../../models/authModel');
const authController = require('../../controllers/authController');

jest.mock('../../models/authModel');

describe('Auth Controller', () => {
  describe('POST /login', () => {
    it('should return a token when valid credentials are provided', async () => {
      const mockedUsers = [{ email: 'frank@gmail.com', password: 'hashedPassword' }];
      authModel.getUsers.mockResolvedValue(mockedUsers);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwt, 'sign').mockImplementation((payload, secret) => {
        return 'mockedToken';
      });
      const req = { body: { email: 'frank@gmail.com', password: 'password' } };
      const res = { json: jest.fn() };
      await authController.loginUser(req, res);
      expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken' });
    });

    it('should return 401 status when invalid credentials are provided', async () => {
      authModel.loginUser.mockResolvedValueOnce(null);

      const response = await request(authController)
        .post('/login')
        .send({ username: 'invaliduser', password: 'invalidpassword' });

      expect(response.status).toBe(401);
    });
  });

  describe('POST /register', () => {
    it('should register a new user and return a token', async () => {
      const newUser = { username: 'newuser', password: 'newpassword' };
      const token = jwt.sign({ username: newUser.username }, 'secret_key');
      authModel.registerUser.mockResolvedValueOnce({ newUser, token });

      const response = await request(authController)
        .post('/register')
        .send({ username: newUser.username, password: newUser.password });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token', token);
    });

    it('should return 409 status when attempting to register an existing user', async () => {
      const existingUser = { username: 'existinguser', password: 'existingpassword' };
      const error = new Error('User already exists');
      error.status = 409;
      authModel.registerUser.mockRejectedValueOnce(error);

      const response = await request(authController)
        .post('/register')
        .send({ username: existingUser.username, password: existingUser.password });

      expect(response.status).toBe(409);
    });
  });
});
