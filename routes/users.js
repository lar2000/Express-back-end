const express = require('express');
const db = require('../database/connect_db'); 

const router = express.Router(); 

router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results); 
  });
});
 
router.get('/single/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'select * from users where id =?';

    db.query(query, [userId], (err, results)=> {
        if(err) {
            return res.status(500).json({ error: 'Database query failed'})
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(results[0]);
    })
})

router.post('/insert', (req, res) => {
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

  router.put('/update/:id', (req, res) => {
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

  router.delete('/delete/:id', (req, res) => {
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

module.exports = router;
