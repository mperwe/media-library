const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const prisma = new PrismaClient();

// Joi schema for user registration
const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
});

// Route for user login and JWT generation
router.post('/login', async (req, res) => {
  const users = await prisma.profile.findMany();
  const { email, password } = req.body;

  // Check if the user exists and the password is correct
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create and send a JWT
  const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

// Define a route for user registration
router.post('/register', async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, name, phone, role } = req.body;

    // Check if user exists in database
    const users = await prisma.profile.findMany();
    const user = users.find((user) => user.email === email);
    if(user) {
        return res.status(409).json({ error: "User exists" }); 
    } else {
       await prisma.profile.create({
            data: {
              username,
              email,
              password,
              name,
              phone,
              role,
            },
          });
        res.status(201).json({ message: 'User registered successfully' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});


module.exports = router;
