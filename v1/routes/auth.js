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


// Define a route for updating user information
router.put('/edit/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { username, email, password, name, phone, role } = req.body;

    try {

// Check if the user exists in the database
    const existingUser = await prisma.profile.findUnique({
        where: { id: userId },
});

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

// Update the user's information
    const updatedUser = await prisma.profile.update({
    where: { id: userId },
    data: {
        username,
        email,
        password,
        name,
        phone,
        role,
    },
});

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
});

// Define a route for deleting a user
router.delete('/delete/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
// Check if the user exists in the database
    const existingUser = await prisma.profile.findUnique({
        where: { id: userId },
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

// Delete the user from the database
        await prisma.profile.delete({
            where: { id: userId },
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
});



});





module.exports = router;
