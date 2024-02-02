// my index.js file
const express = require('express');
const cors = require('cors')
//const morgan = require('morgan')




const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const moviesRoute = require('./routes/movieRoute');
const usersRoute = require('./routes/usersRoute')

const app = express();
const port = 4100;

// Import and use the protected route
const protectedRoute = require('./routes/protectedRoute');

app.use(cors())


// Middleware
//app.use(morgan('dev'));
app.use(bodyParser.json());


// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/movies', moviesRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api', protectedRoute);


// Welcome Route
app.get('/api/v1/', (req, res) => {
  res.send('Welcome to the Movie Library!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
