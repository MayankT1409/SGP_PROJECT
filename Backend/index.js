const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');
const path = require('path');

dotenv.config();

const app = express();


// CORS config
const allowedOrigins = [
  'http://localhost:5173',                  // development
  'https://sgp-project-1.onrender.com'      // production
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true,
// }));

app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', 'Frontend', 'dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('HeritageConnect API is running');
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
