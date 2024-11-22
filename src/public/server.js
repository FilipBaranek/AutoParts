const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection setup
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql', // Docker service name for MySQL
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'rootpassword',
  database: process.env.MYSQL_DATABASE || 'autopartsdb',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Serve static files (images, styles, scripts, etc.)
app.use(express.static(path.join(__dirname, 'src', 'public', 'styles')));  // This will serve files from src/public
app.use(express.static(path.join(__dirname, 'src', 'views', 'images'))); 
app.use(express.static(path.join(__dirname, 'src', 'views', 'images', 'categories'))); 

// Routes for HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'login.html'));
});

app.get('/signin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'signin.html'));
});

// Catch-all route to handle unknown requests (optional)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
