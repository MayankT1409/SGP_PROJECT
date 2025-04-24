
const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const protect = require('../middleware/auth')
// const sendVerificationEmail = require('../services/emailService.js');
const sendEmail = require('../services/sendEmail');
const nodemailer = require("nodemailer");
const VerificationCode = require('../models/VerificationCode');
const path = require("path");
const fs = require("fs");
const router = express.Router();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register user
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id), // ✅ Generates a JWT Token
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Received login request for:", email);

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found.");
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     console.log("Entered Password:", password);
//     console.log("Stored Hashed Password:", user.password);

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Password match:", isMatch);

//     if (!isMatch) {
//       console.log("Password incorrect.");
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 🔹 Generate a 6-digit verification code
//     const verificationCode = generateVerificationCode();

//     // 🔹 Save to database
//     await VerificationCode.findOneAndUpdate(
//       { email },
//       { code: verificationCode, expiresAt: Date.now() + 10 * 60 * 1000 },
//       { upsert: true, new: true }
//     );

//     // 🔹 Send email with the verification code
//     await sendEmail(email, "Your Verification Code", `<p>Your verification code is: <strong>${verificationCode}</strong></p>`);

//     // console.log(`✅ Verification code sent to ${email}`);

//     res.status(200).json({ message: "Verification code sent to email", email });

//   } catch (err) {
//     console.error("Error in login:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request for:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found.");
      logLoginAttempt(email, "FAILED - User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password incorrect.");
      logLoginAttempt(email, "FAILED - Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔹 Generate a 6-digit verification code
    const verificationCode = generateVerificationCode();

    // 🔹 Save to database
    await VerificationCode.findOneAndUpdate(
      { email },
      { code: verificationCode, expiresAt: Date.now() + 10 * 60 * 1000 },
      { upsert: true, new: true }
    );

    // 🔹 Send email with the verification code
    await sendEmail(email, "Your Verification Code", `<p>Your verification code is: <strong>${verificationCode}</strong></p>`);

    console.log(`✅ Verification code sent to ${email}`);
    
    logLoginAttempt(email, "SUCCESS - Verification code sent");

    res.status(200).json({ message: "Verification code sent to email", email });

  } catch (err) {
    console.error("Error in login:", err);
    logLoginAttempt(email, "ERROR - Server error");
    res.status(500).json({ message: "Server error" });
  }
});

function logLoginAttempt(email, status) {
  const logData = `${new Date().toISOString()} - Email: ${email} - Status: ${status}\n`;
  const logFilePath = path.join(__dirname, 'logs.txt');

  fs.appendFile(logFilePath, logData, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

//email verification route
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    const record = await VerificationCode.findOne({ email });

    if (!record || record.code !== code || Date.now() > record.expiresAt) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // Delete the verification record after successful verification
    await VerificationCode.deleteOne({ email });

    // Generate JWT token after successful verification
    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // res.status(200).json({ message: "Verification successful", token });
    res.status(200).json({ message: "Verification successful", token, name: user.name });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;