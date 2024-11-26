
const mysql = require('mysql2');  // import mysql in mysql

// Create and export the MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // your MySQL username
  password: '',            // your MySQL password (if any)
  database: 'apart'  // the name of your database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID ' + db.threadId);
});

// Export the connection so it can be used in other parts of the application
module.exports = db;
