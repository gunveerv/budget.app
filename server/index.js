const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Middleware
dotenv.config({ path: './.env' })
app.use(express.json());

// Simple endpoint route handler
app.get('/', (req, res) => {
  res.send('Hello, this is a simple Express API for Budget.App!');
  console.log(req.body);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
