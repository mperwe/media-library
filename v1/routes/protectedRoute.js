// routes/protectedRoute.js

const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../controllers/protectedController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected route 
router.get('/protected', authMiddleware, protectedRoute);

module.exports = router;
