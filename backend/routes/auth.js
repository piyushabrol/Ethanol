const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  console.log("Request recieved")
  const { username, email, password, phone } = req.body;
  console.log(req.body)
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, phone });
  await user.save();
  res.status(201).json({ message: "User registered" });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  const user = await User.findOne({ username });
  if (!user || !password) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }else{
    const verify = await bcrypt.compare(password, user.password)

    if(!verify){
      return res.status(404).json({message:"Not auth"})
    }
  }
  const token = jwt.sign({ id: user._id }, "secretKey");
  res.json({ token });
});

// Logout (for token-based auth, just delete token client-side)
router.post('/user/logout', (req, res) => {
  res.json({ message: "Logged out" });
});

module.exports = router;
