const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Protected route (requires a valid JWT)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You have access to this protected route!' });
  });

module.exports = router;
