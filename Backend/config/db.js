// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI; // Get the connection string from environment variables

//     if (!mongoURI) {
//       console.error("❌ MONGO_URI is not defined in the environment variables!");
//       process.exit(1); // Exit if the connection string is missing
//     }

//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true, // Recommended for new projects
//       useUnifiedTopology: true, // Recommended for new project
//       tlsAllowInvalidCertificates: true,
//     });

//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB