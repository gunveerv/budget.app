const express = require('express');
const app = express();
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes');

const port = process.env.PORT || 3000;

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
dotenv.config({ path: './.env' })
app.use(express.json());

// Debug Purposes
const DEBUG_INDEX = process.env.DEBUG || false; 

//routes 
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
