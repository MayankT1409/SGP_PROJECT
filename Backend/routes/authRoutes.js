// // const express = require('express');
// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const User = require('../models/User');
// // const router = express.Router();

// // // Signup Route
// // router.post('/signup', async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;

// //         // Check if user already exists
// //         let user = await User.findOne({ email: email.toLowerCase() });
// //         if (user) {
// //             return res.status(400).json({ msg: 'User already exists' });
// //         }

// //         // Create new user - password hashing is handled by the User model pre-save middleware
// //         user = new User({
// //             name,
// //             email: email.toLowerCase(),
// //             password
// //         });

// //         await user.save();
// //         res.status(201).json({ msg: 'Signup successful! Please log in.' });
// //     } catch (err) {
// //         console.error('Signup error:', err);
        
// //         // Handle validation errors
// //         if (err.name === 'ValidationError') {
// //             const messages = Object.values(err.errors).map(val => val.message);
// //             return res.status(400).json({ msg: messages.join(', ') });
// //         }
        
// //         res.status(500).json({ msg: 'Server error' });
// //     }
// // });

// // // Login Route with detailed debugging
// // router.post('/login', async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
        
// //         // Log the login attempt
// //         console.log("Login attempt:", { email });
        
// //         // Validate inputs
// //         if (!email || !password) {
// //             return res.status(400).json({ msg: 'Please provide email and password' });
// //         }

// //         // Find user by email (case insensitive)
// //         const user = await User.findOne({ email: email.toLowerCase() });
        
// //         // Check if user exists
// //         if (!user) {
// //             console.log('User not found with email:', email);
// //             return res.status(400).json({ msg: 'Invalid credentials' });
// //         }

// //         console.log('User found:', user.email);
// //         console.log('Stored password hash:', user.password.substring(0, 15) + '...');

// //         // Direct password comparison using bcrypt (not using the model method)
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         console.log('Password match result:', isMatch);
        
// //         if (!isMatch) {
// //             console.log('Password does not match for user:', email);
// //             return res.status(400).json({ msg: 'Invalid credentials' });
// //         }

// //         // Generate JWT token
// //         const token = jwt.sign(
// //             { id: user._id }, 
// //             process.env.JWT_SECRET, 
// //             { expiresIn: '1d' }
// //         );

// //         console.log('Login successful for:', email);
        
// //         // Return user data and token
// //         res.json({
// //             msg: 'Login successful',
// //             token,
// //             user: {
// //                 id: user._id,
// //                 name: user.name,
// //                 email: user.email
// //             }
// //         });
// //     } catch (err) {
// //         console.error('Login error:', err);
// //         res.status(500).json({ msg: 'Server error' });
// //     }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Signup route
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword
//     });

//     // Save user to database
//     await user.save();

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(201).json({
//       message: 'User created successfully',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


// 2:
// const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Signup Route
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(201).json({
//       message: 'User created successfully',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User does not exist' });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;



// const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Signup Route
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     // Log the received data
//     console.log('\n--- New Signup Request ---');
//     console.log('Name:', name);
//     console.log('Email:', email);
//     console.log('Password:', '********'); // For security, we don't log the actual password
//     console.log('------------------------\n');

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log('Signup failed: User already exists -', email);
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword
//     });

//     await user.save();
//     console.log('User successfully created:', { name, email });

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(201).json({
//       message: 'User created successfully',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User does not exist' });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;



const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/auth')





const router = express.Router();

// Register user
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = router;