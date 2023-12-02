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
router.use(express.json());

// Debug Purposes
const DEBUG_INDEX = process.env.DEBUG || false; 

// Status endpoint
router.get('/status', (req, res) => {
    status = {
      message: 'Hello, this is a simple Express API for Budget.App!',
      success: true
    };
    res.status(200).send(status);
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

  res.status(200).send(records);
})); 

// Get record ids
router.get("/record/ids", asyncMiddleware(async (req, res) => {
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

  const ids = [];

  records.forEach((records) => {
    const id = records.id;
    ids.push(id);
  });
  
  if (DEBUG_INDEX) {
    console.log('GET apiRoutes/records/ids' , JSON.stringify(records));
    console.log('GET apiRoutes/records/ids filter' , JSON.stringify(filter));
  }

  res.status(200).send({ids});
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
    cost: Number(req.body.cost),
    date: req.body.date ? new Date(req.body.date) : Date.now(),
  });

  const saveRecord = await newRecord.save();

  if (DEBUG_INDEX) {
    console.log('POST apiRoutes/records' , JSON.stringify(req.body));
  }

  res.status(201).json({ message: 'Record created successfully', record: saveRecord });
})); 

// Patch record
router.patch("/record/update/:id", asyncMiddleware(async (req, res) => {

  // Find Record
  const id = req.params.id;
  const newRecord = await Record.findById(id);

  // Apply Updates & Save
  Object.keys(req.body).forEach((key) => {
    if (!(key in newRecord)) {
      res.status(400).send(`PATCH failed, Record id ${id}: key did not exist`);
    };
    newRecord[key] = req.body[key];
  });
  const saveRecord = await newRecord.save();

  if (DEBUG_INDEX) {
    console.log(`PATCH apiRoutes/record/update/${id}: ${saveRecord}`);
  }

  res.status(200).send(`PATCH sent with Record id ${id}`);
}));

// Delete record
router.delete("/record", asyncMiddleware(async (req, res) => {
  const ids = req.body.ids;
  const deleteRecords = {
    successful: [],
    failed: []
  };

  for (const id of ids) {
    const getRecord = await Record.findById(id);
    if (getRecord) {
      const deleteRecord = await Record.deleteOne({ _id: id });
      deleteRecords.successful.push(id);

      if (DEBUG_INDEX) {
        console.log(`DELETE apiRoutes/record/update/${id}: ${JSON.stringify(deleteRecord)}`);
      }
    } else {
      console.error(`Cannot delete Record with id ${id}, Record not found`);
      deleteRecords.failed.push(id);
    }
  };

  res.status(200).send(`Delete sent with Record ids ${JSON.stringify(ids)}: ${JSON.stringify(deleteRecords)}`);
}));

module.exports = router;