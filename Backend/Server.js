require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

console.log("MONGO_URL:", process.env.MONGO_URL); // Check if the MONGO_URL is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check if the JWT_SECRET is loaded

app.use(cors());
app.use(express.json()); // Ensure body parser is used to parse JSON requests

// Handle the strictQuery deprecation warning
mongoose.set("strictQuery", true);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoUrl = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable not defined");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable not defined");
}

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "LawyerApp",
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Define Lawyer Schema and Model with Collection Name
const lawyerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    licenseNumber: String,
    address: String,
    city: String,
    zip: String,
    phoneNum: String,
    practiceArea: String,
    morePracticeArea: [String], // New field added for more practice areas
    yearsAdmitted: String,
    disciplinaryHistory: [String],
    licenseImage: String,
    bio: String,
    fee: Number,
    court: [String],
    specialization: [String],
    education: [String],
    languages: [String],
    profileImage: String // Field added to store the image URL or path
  },
  { collection: "LawyerData" }
);

const Lawyer = mongoose.model("Lawyer", lawyerSchema);

// Sign-Up Endpoint
app.post("/api/lawyers/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    licenseNumber,
    address,
    city,
    zip,
    phoneNum,
    practiceArea,
    yearsAdmitted,
    disciplinaryHistory,
    licenseImage,
  } = req.body;

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
    const token = jwt.sign({ id: lawyer._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, lawyer });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Lawyer Additional Information Endpoint
app.put("/api/lawyers/:id/additional-info", async (req, res) => {
  const { id } = req.params;
  console.log('Received lawyerId:', id); // Log the lawyerId

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid Lawyer ID' });
  }

  const {
    bio,
    fee,
    court,
    specialization,
    education,
    languages,
    morePracticeArea
  } = req.body;

  try {
    const existingLawyer = await Lawyer.findById(id);
    if (existingLawyer.bio || existingLawyer.fee || existingLawyer.court.length || existingLawyer.specialization.length || existingLawyer.education.length || existingLawyer.languages.length || existingLawyer.morePracticeArea.length) {
      return res.status(400).json({ message: "You have already completed this form. Duplicate submissions are not allowed." });
    }

    const updatedLawyer = await Lawyer.findByIdAndUpdate(
      id,
      { bio, fee, court, specialization, education, languages, morePracticeArea },
      { new: true, runValidators: true }
    );

    if (!updatedLawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    res.status(200).json(updatedLawyer);
  } catch (error) {
    console.error("Error updating additional info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Profile image upload endpoint
app.post('/api/lawyers/:id/profile-image', upload.single('profileImage'), async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    console.log(`Received file: ${req.file.originalname}`); // Log file name

    const lawyer = await Lawyer.findById(id);
    if (!lawyer) {
      console.error(`Lawyer not found for ID: ${id}`); // Log if lawyer not found
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    // Assuming the frontend is hosted on the same server
    const profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log(`Profile Image URL: ${profileImageUrl}`); // Log the profile image URL

    lawyer.profileImage = profileImageUrl;

    const saveResult = await lawyer.save();
    console.log(`Profile image updated in database for lawyer ID ${id}`); // Log successful update
    console.log(`Save result: ${JSON.stringify(saveResult)}`);

    res.status(200).json({ message: 'Profile image uploaded successfully', profileImage: lawyer.profileImage });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Endpoint
app.post("/api/lawyers/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, lawyer.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: lawyer._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, lawyer });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Get Lawyer Details Endpoint
app.get("/api/lawyers/me", authenticateToken, async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.user.id);
    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }
    res.status(200).json(lawyer);
  } catch (error) {
    console.error("Error fetching lawyer data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/lawyers/update", authenticateToken, async (req, res) => {
  const { id } = req.user;
  const updateData = req.body;

  console.log('Received update request for lawyer with ID:', id);
  console.log('Update data:', updateData);

  try {
    const updatedLawyer = await Lawyer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedLawyer) {
      console.error('Lawyer not found');
      return res.status(404).json({ message: "Lawyer not found" });
    }

    console.log('Updated lawyer:', updatedLawyer);
    res.status(200).json(updatedLawyer);
  } catch (error) {
    console.error("Error updating lawyer data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Search Lawyers by City and Practice Area Endpoint
app.get("/api/lawyers/search", async (req, res) => {
  const { city, practiceArea } = req.query;

  try {
    const lawyers = await Lawyer.find({
      city: city,
      practiceArea: practiceArea,
    });

    if (!lawyers.length) {
      return res.status(404).json({ message: "No lawyers found" });
    }

    res.status(200).json(lawyers);
  } catch (error) {
    console.error("Error searching for lawyers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5001, () => {
  console.log("Node js server started.");
});
