// my index.js file
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const moviesRoute = require('./routes/movieRoute');
const usersRoute = require('./routes/usersRoute')

const app = express();
const port = 4100;

// Import and use the protected route
const protectedRoute = require('./routes/protectedRoute');
app.use(cors())
app.use('/api', protectedRoute);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoute);
app.use('/movies', moviesRoute);
app.use('/users', usersRoute);


// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to the Movie Library!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
