const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./v1/routes/auth');
const profileRoutes = require('./v1/routes/profile');
const userRoutes = require('./v1/routes/users');
const app = express();

// Body parsing middleware
app.use(bodyParser.json());
// Route for user login
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/users', userRoutes);

const port = 4100;

app.get('/', (req, res) => {
  res.send('Media Libray Server connecting!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
