const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Simulated user database (replace this with a real database)
const users = [];

// Route for user login and JWT generation
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists and the password is correct
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create and send a JWT
  const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

 // Define a route for user registration
router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Create a new user in the database using Prisma
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while registering the user' });
    }
  });
  




module.exports = router;
