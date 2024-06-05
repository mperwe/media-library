// controllers/userController.js

const { error } = require('console');
const userModel = require('../models/userModel');
const authModel = require('../models/authModel');

const userController = {
    async updateUser(req, res) {
        const userEmail = parseInt(req.params.userEmail);
        const userData = req.body;

        try {
            const existingUser = await authModel.getUserByEmail(userEmail);

            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const updatedUser = await userModel.updateUser(userEmail, userData);

            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    },

    async deleteUser(req, res) {
        const userEmail = req.params.userEmail
        try {
            const existingUser = await authModel.getUserByEmail(userEmail);
           
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            await userModel.deleteUser(userEmail);

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
