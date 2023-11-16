// controllers/authController.js

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const authModel = require('../models/authModel');

const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
});

const authController = {
    async loginUser(req, res) {
        try {
            const users = await authModel.getUsers();
            const { email, password } = req.body;

            const user = users.find((user) => user.email === email && user.password === password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    },

    async registerUser(req, res) {
        try {
            const { error } = registrationSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { username, email, password } = req.body;

            const existingUser = await authModel.getUserByEmail(email);

            if (existingUser) {
                return res.status(409).json({ error: 'User exists' });
            } else {
                await authModel.createUser({
                    username,
                    email,
                    password,
                    role: 'user',
                });

                res.status(201).json({ message: 'User registered successfully' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while registering the user' });
        }
    },
};

module.exports = authController;
