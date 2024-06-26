require('dotenv').config(); // Load environment variables

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require('cors');
const jwt = require('jsonwebtoken');

console.log("MONGO_URL:", process.env.MONGO_URL);  // Check if the MONGO_URL is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Check if the JWT_SECRET is loaded

app.use(cors());
app.use(express.json()); // Ensure body parser is used to parse JSON requests

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
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'LaywerApp' })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Define Lawyer Schema and Model with Collection Name
const lawyerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  licenseNumber: String,
  address: String,
  city: String,
  zip: String,
  phoneNum: String,
  practiceArea: String,
  yearsAdmitted: String,
  disciplinaryHistory: [String],
  licenseImage: String, // You can change this based on how you handle image storage
}, { collection: 'LaywerData' });

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

// Sign-Up Endpoint
app.post('/api/lawyers', async (req, res) => {
  const { name, email, password, licenseNumber, address, city, zip, phoneNum, practiceArea, yearsAdmitted, disciplinaryHistory, licenseImage } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Lawyer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new lawyer document
    const lawyer = new Lawyer({
      name,
      email,
      password: hashedPassword,
      licenseNumber,
      address,
      city,
      zip,
      phoneNum,
      practiceArea,
      yearsAdmitted,
      disciplinaryHistory,
      licenseImage,
    });

    // Save the lawyer document to the database
    await lawyer.save();

    // Generate JWT token
    const token = jwt.sign({ id: lawyer._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, lawyer });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5001, () => {
  console.log("Node js server started.");
});
