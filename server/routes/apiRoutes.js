// routes / apiRoutes

const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const db = require('../db/dbConn');

// Middleware
dotenv.config({ path: '../.env' })

// Debug Purposes
const DEBUG_INDEX = process.env.DEBUG || false; 

// Status endpoint
router.get('/status', (req, res) => {
    res.status(200).send('Hello, this is a simple Express API for Budget.App!');
    if (DEBUG_INDEX) {
      console.log('GET apiRoutes/status' , JSON.stringify(req.body));
    }
  });
  
// Get record
router.get("/record", (req, res) => {
  const status = {
    "key": 123,
    "data": "json"
  };
  if (DEBUG_INDEX) {
    console.log('GET apiRoutes/records' , JSON.stringify(req.body));
  }
  res.status(200).send(status)
}); 

// Get categories
router.get("/categories", (req, res) => {
  const status = {
    "categories": "1,2,3,4,5",
    "data": "json"
  };
  if (DEBUG_INDEX) {
    console.log('GET apiRoutes/categories' , JSON.stringify(req.body));
  }
  res.status(200).send(status)
}); 

// Post categories
router.post("/record", (req, res) => {
  const data = JSON.stringify(req.body)
  if (DEBUG_INDEX) {
    console.log('POST apiRoutes/records' , data);
  }
  res.status(200).send(`POST sent to records: ${JSON.stringify(data)}`)
}); 

module.exports = router;