const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.static('.')); // serve index.html

// DB connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if(err) console.error('DB connection failed:', err);
  else console.log('Connected to MySQL');
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM mytable', (err, results) => {
    if(err) res.status(500).send(err);
    else res.json(results);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));

