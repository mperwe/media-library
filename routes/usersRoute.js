// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.put('/edit/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);
router.get('/', userController.getAllUsers);

module.exports = router;
