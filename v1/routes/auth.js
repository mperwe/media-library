const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// Simulated user database (replace this with a real database)
const users = [];

// Route for user login and JWT generation
router.post('/login', async(req, res) => {
    const users = await prisma.profile.findMany()
    const { email, password } = req.body;
    console.log("user", users)

    // Check if the user exists and the password is correct
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and send a JWT
    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
});

// Define a route for user registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, name, phone, role } = req.body;

// Create a new user in the database using Prisma
const user = await prisma.profile.create({
    data: {
        username,
        email,
        password,
        name,
        phone,
        role
        },
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});





module.exports = router;
