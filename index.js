const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bodyParser = require('body-parser');
const authRoutes = require('./v1/routes/auth');
const authMiddleware = require('./v1/middleware/authMiddleware');
const app = express();

app.use(bodyParser.json());


// Route for user login
app.use('/auth', authRoutes);

// Protected route (requires a valid JWT)
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have access to this protected route!' });
});

const port = 4100;


app.get('/', (req, res) => {
  res.send('Media Libray Server connecting!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
