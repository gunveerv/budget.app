const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const recordSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // generate a default value
  },  
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String, //change
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;