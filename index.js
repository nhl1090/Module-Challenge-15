const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/api');

const PORT = 3001;
const app = express();

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use(routes);

// Start the server after ensuring the database connection is established
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});