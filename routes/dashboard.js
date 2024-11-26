const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    console.log('[GET ROUTE SUCCESSFULLY!!!!]');
    res.send('Welcome to Dashboard Dev!!')
  })



module.exports = router;