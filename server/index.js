const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Debug Purposes
const DEBUG_INDEX = process.env.DEBUG || false; 

// Middleware
dotenv.config({ path: './.env' })
app.use(express.json());

// Simple endpoint route handler
app.get('/', (req, res) => {
  res.send('Hello, this is a simple Express API for Budget.App!');
  if (DEBUG_INDEX) {
    console.log(req.body);
  }
});

// Status sample
app.get("/status", (req, res) => {
  const status = {
    "Status": "Running",
    "Message": "hello world"
  };
  if (DEBUG_INDEX) {
    console.log(req.body);
  }
  res.send(status)
}); 

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
