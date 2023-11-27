// routes / apiRoutes

const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const Record = require('../models/record');
const db = require('../db/dbConn');
const Category = require('../modules/category');

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
  // Query Filter
  const filter = {};

  // Date Filter 
  const { startDate, endDate } = req.query;
  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }
  // Run Query
  const records = await Record.find(filter);
  
  if (DEBUG_INDEX) {
    console.log('GET apiRoutes/records' , JSON.stringify(records));
    console.log('GET apiRoutes/records filter' , JSON.stringify(filter));
  }

  res.status(200).send(records)
})); 

// Get categories
router.get("/categories", (req, res) => {
  const { categories, serializeCategories } = Category();
  const status = serializeCategories;

  if (DEBUG_INDEX) {
    console.log('GET apiRoutes/categories' , JSON.stringify(status));
  }

  res.status(200).send(status)
}); 

// Post categories
router.post("/record", asyncMiddleware(async (req, res) => {
  const newRecord = new Record({
    name: req.body.name,
    category: req.body.category,
    cost: req.body.cost,
    date: req.body.date ?? Date.now(),
  });

  const saveRecord = await newRecord.save();

  if (DEBUG_INDEX) {
    console.log('POST apiRoutes/records' , JSON.stringify(req.body));
  }

  res.status(200).send(`POST sent to Database with a new Record: ${saveRecord}`);
})); 

module.exports = router;