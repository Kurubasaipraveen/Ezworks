const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwtSecret = require('../config/jwtSecret');

// Sign-up
exports.signUp = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    // Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  const { verification_code } = req.params;

  try {
    const user = await User.findOne({ where: { verification_code } });

    if (!user) return res.status(400).json({ error: 'Invalid verification code' });

    user.email_verified = true;
    await user.save();
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
