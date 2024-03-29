// controllers/userController.js

const { error } = require('console');
const userModel = require('../models/userModel');

const userController = {
    async updateUser(req, res) {
        const userId = parseInt(req.params.userId);
        const userData = req.body;

        try {
            const existingUser = await userModel.getUserById(userId);

            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const updatedUser = await userModel.updateUser(userId, userData);

            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    },

    async deleteUser(req, res) {
        const userId = parseInt(req.params.userId);
        console.log(userId)
        try {
            const existingUser = await userModel.getUserById(userId);
           
            console.log(existingUser)

            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            await userModel.deleteUser(userId);

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await userModel.getUsers()
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
};

module.exports = userController;
