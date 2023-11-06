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

module.exports = router;
