require('dotenv').config(); // Load environment variables

console.log("MONGO_URL:", process.env.MONGO_URL);  // Check if the MONGO_URL is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Check if the JWT_SECRET is loaded

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());

// Add this line to handle the strictQuery deprecation warning
mongoose.set('strictQuery', true);

const mongoUrl = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (!mongoUrl) {
  throw new Error('MONGO_URL environment variable not defined');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable not defined');
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Ensure body parser is used to parse JSON requests
app.use(express.json());



app.listen(5001, () => {
  console.log("Node js server started.");
});
