// authController.test.js

const authController = require('../controllers/authController');
const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/authModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('authController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('loginUser', () => {
        it('should return a token when valid credentials are provided', async () => {
            const mockedUsers = [{ email: 'frank@gmail.com', password: 'hashedPassword' }];
            authModel.getUsers.mockResolvedValue(mockedUsers);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockedToken');

            const req = { body: { email: 'frank@gmail.com', password: 'password' } };
            const res = { json: jest.fn() };

            await authController.loginUser(req, res);

            expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken' });
        });

        it('should return a 401 error when invalid credentials are provided', async () => {
            const mockedUsers = [{ email: 'frank@gmail.com', password: 'hashedPassword' }];
            authModel.getUsers.mockResolvedValue(mockedUsers);
            bcrypt.compare.mockResolvedValue(false);

            const req = { body: { email: 'frank@gmail.com', password: 'wrongPassword' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });

        it('should return a 500 error when an error occurs during login', async () => {
            authModel.getUsers.mockRejectedValue(new Error('Database error'));

            const req = { body: { email: 'frank@gmail.com', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while logging in' });
        });
    });

    describe('registerUser', () => {
        it('should register a new user and return a token', async () => {
            authModel.getUserByEmail.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue('mockedSalt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
            authModel.createUser.mockResolvedValue();
            jwt.sign.mockReturnValue('mockedToken');

            const req = { body: { username: 'testUser', email: 'frank@gmail.com', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully', token: 'mockedToken' });
        });

        it('should return a 409 error if the user already exists', async () => {
            authModel.getUserByEmail.mockResolvedValue({ email: 'frank@gmail.com' });

            const req = { body: { username: 'testUser', email: 'frank@gmail.com', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ error: 'User exists' });
        });

        it('should return a 500 error when an error occurs during registration', async () => {
            authModel.getUserByEmail.mockRejectedValue(new Error('Database error'));

            const req = { body: { username: 'testUser', email: 'frank@gmail.com', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while registering the user' });
        });
    });
});
