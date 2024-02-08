// controllers/authController.js
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const authModel = require('../models/authModel');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

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

            
            const user = users.find((user) => user.email === email);
            console.log(user)
            const valid = await bcrypt.compare(password, user.password);


            if (!valid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ email }, `${JWT_SECRET_KEY}`, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    },

    async registerUser(req, res) {
        try {
            const { error } = registrationSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            //Encryption with bcrypt.
            const { username, email, password } = req.body;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password,salt)
            const existingUser = await authModel.getUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({ error: 'User exists' });
            } else {
                await authModel.createUser({
                    username,
                    email,
                    password: hashedPassword,
                    role: 'user',
                });
                const token = jwt.sign({ email }, `${JWT_SECRET_KEY}`, { expiresIn: '1h' });
                res.status(201).json({ message: 'User registered successfully', token });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while registering the user' });
        }
    },
};

module.exports = authController;
