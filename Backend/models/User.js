// // const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");

// // // Define User Schema
// // const UserSchema = new mongoose.Schema(
// //   {
// //     name: {
// //       type: String,
// //       required: [true, "Name is required"],
// //       trim: true
// //     },
// //     email: {
// //       type: String,
// //       required: [true, "Email is required"],
// //       unique: true,
// //       lowercase: true,
// //       trim: true,
// //       match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
// //     },
// //     password: {
// //       type: String,
// //       required: [true, "Password is required"],
// //       minlength: [6, "Password must be at least 6 characters"]
// //     }
// //   },
// //   { timestamps: true }
// // );

// // // Hash password before saving
// // UserSchema.pre("save", async function (next) {
// //   // Only hash the password if it's modified or new
// //   if (!this.isModified("password")) {
// //     console.log("🔹 Password not modified, skipping hashing.");
// //     return next();
// //   }

// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// //     console.log("✅ Password hashed successfully");
// //     next();
// //   } catch (err) {
// //     console.error("❌ Error hashing password:", err);
// //     next(err);
// //   }
// // });

// // // Compare entered password with stored hashed password
// // UserSchema.methods.comparePassword = async function (enteredPassword) {
// //   try {
// //     console.log("🔑 Comparing passwords for:", this.email);
// //     const isMatch = await bcrypt.compare(enteredPassword, this.password);
// //     console.log("🔄 Password match status:", isMatch);
// //     return isMatch;
// //   } catch (err) {
// //     console.error("❌ Error comparing passwords:", err);
// //     throw err;
// //   }
// // };

// // module.exports = mongoose.model("User", UserSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;