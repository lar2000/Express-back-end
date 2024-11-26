// app.js
const express = require('express');
const db = require('./database/connect_db');  // Import the database connection 
const app = express();
// Middleware to parse JSON requests
app.use(express.json());

const dashRoute = require('./routes/dashboard');
const usersRoute = require('./routes/users');

app.use('/', dashRoute);
app.use('/users', usersRoute);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
