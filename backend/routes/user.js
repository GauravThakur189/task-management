const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/sign-in", async (req, res) => {
  try {
      const { username, email, password } = req.body;
      
      // Validate input fields
      if (!username || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      } else if (username.length <= 3) {
          return res.status(400).json({ message: "Username must be at least 4 characters long" });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
      }

      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({
          username,
          email,
          password: hashPass,
      });
      await newUser.save();
      return res.status(200).json({ message: "Sign In Successfully" });
  } catch (error) {
      console.log("Error in sign in", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});


//Login
router.post("/log-in", async (req, res) => {
  try {
      const { username, password } = req.body;

      // Validate input fields
      if (!username || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ username });
      if (!existingUser) {
          return res.status(400).json({ message: "Username does not exist" });
      }

      bcrypt.compare(password, existingUser.password, (err, data) => {
          if (err) {
              return res.status(500).json({ message: "Internal Server Error" });
          }
          if (data) {
              const authClaims = { name: username };
              const token = jwt.sign(authClaims, "gaurav123", { expiresIn: "2d" });
              res.status(200).json({ id: existingUser._id, token });
          } else {
              return res.status(400).json({ message: "Invalid Password" });
          }
      });
  } catch (error) {
      console.log("Error in login", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
