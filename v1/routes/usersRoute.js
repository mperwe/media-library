// routes/userRoutes.js

const express = require('express');
const userController = require('.v1/controllers/userController');
const router = express.Router();

router.put('/edit/:userId', userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;
