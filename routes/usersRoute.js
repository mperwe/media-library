// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.put('/edit/:userId', auth, userController.updateUser);
router.delete('/delete/:userId', auth, userController.deleteUser);
router.get('/', auth, userController.getAllUsers);
router.post('/login', authController.loginUser);
router.post('/signup', authController.registerUser);


module.exports = router;

// routes/authRoutes.js





