const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Middleware
dotenv.config({ path: '../.env' })

console.log(process.env.DB_URI);
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI);

const db = mongoose.connection;

// Routes for connection
db.on('connected', () => {
  console.log(`Connected to MongoDB at ${dbURI}`);
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Close when nodejs is closed
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

module.exports = db;