const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

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

module.exports = router