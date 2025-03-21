// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   // Extract the token from the Authorization header
//   const authHeader = req.header("Authorization");

//   // Check if the Authorization header is missing or doesn't start with "Bearer "
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("Authorization header missing or invalid"); // Log the issue
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   // Extract the token from the header
//   const token = authHeader.split(" ")[1];

//   try {
//     // Verify the token using the JWT secret
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token verified successfully. User ID:", decoded.id); // Log the decoded user ID

//     // Attach the user ID to the request object
//     req.user = decoded.id;
//     next(); // Proceed to the next middleware or route handler
//   } catch (err) {
//     console.error("Token verification failed:", err.message); // Log the error
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;

// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ message: 'No authentication token, access denied' });
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token verification failed, authorization denied' });
//   }
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;