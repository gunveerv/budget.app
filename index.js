const express = require('express');
const app = express();
const port = 3000;

// Simple endpoint
app.get('/', (req, res) => {
  res.send('Hello, this is a simple Express API! test function');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
