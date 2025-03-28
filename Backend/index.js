// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);

// // Basic route for testing
// app.get('/', (req, res) => {
//   res.send('HeritageConnect API is running');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import db.js
const authRoutes = require('./routes/authRoutes.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Allow frontend requests
  credentials: true,
}));


app.use(express.json());

// Connect to MongoDB
connectDB(); 

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('HeritageConnect API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
