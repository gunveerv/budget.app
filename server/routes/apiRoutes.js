// routes / apiRoutes

const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const db = require('../db/dbConn');
const Record = require('../models/record');

// Middleware
dotenv.config({ path: '../.env' })
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

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
router.get("/record", asyncMiddleware(async (req, res) => {
  const records = await Record.find({});
  if (DEBUG_INDEX) {
    console.log('GET apiRoutes/records' , JSON.stringify(records));
  }
  res.status(200).send(records)
})); 

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
  const newRecord = new Record(JSON.stringify(req.body));
  
  if (DEBUG_INDEX) {
    console.log('POST apiRoutes/records' , data);
  }
  res.status(200).send(`POST sent to records: ${JSON.stringify(data)}`)
}); 

module.exports = router;