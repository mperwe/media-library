// my index.js file

const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./v1/routes/authRoute');


const app = express();
const port = 4100;

// Import and use the protected route
const protectedRoute = require('./v1/routes/protectedRoute');

app.use('/api', protectedRoute);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoute);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
