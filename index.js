// app.js
const express = require('express');
const db = require('./api/setting/apiconnect_db');  // Import the database connection
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to get all users from the database
app.get('/api/users', (req, res) => {
  db.query(`SELECT * FROM users`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Define a route to create a new user
app.post('/api/insert', (req, res) => {
  const { user_id, firstName,lastName,gender,email,password,phoneNumber} = req.body;
  const query = `INSERT INTO users (user_id, firstName,lastName,gender,email,password,phoneNumber)
   VALUES (?,?,?,?,?,?,?)`;
  
  db.query(query, [user_id, firstName,lastName,gender,email,password,phoneNumber], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert user' });
    }
    res.status(201).json({ id: result.insertId, user_id, firstName,lastName,gender,email,password,phoneNumber });
  });
});



// Define a route to get a specific user by ID
app.get('/api/single/:id', (req, res) => {      //'/api/single/:id'===>> http://localhost:3000/api/single/id
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

// Define a route to update a user by ID
app.put('/api/update/:id', (req, res) => {
  const userId = req.params.id;
  const { firstName,lastName,gender,email,password,phoneNumber } = req.body;
  const query = 'UPDATE users SET firstName = ?, lastName = ?, gender = ?, email = ?, password = ?, phoneNumber = ? WHERE id = ?';

  db.query(query, [firstName,lastName,gender,email,password,phoneNumber, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: userId, firstName,lastName,gender,email,password,phoneNumber });
  });
});

// Define a route to delete a user by ID
app.delete('/api/delete/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();  // No content for successful deletion
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
