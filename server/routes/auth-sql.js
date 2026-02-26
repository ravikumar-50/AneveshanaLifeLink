const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/UserSQL');
const { protect } = require('../middleware/auth');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, lat, lng } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user already exists
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'user',
      lat: lat || 0,
      lng: lng || 0,
    });

    res.status(201).json({
      message: 'Registration successful',
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        lat: user.lat,
        lng: user.lng,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/profile (protected)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      lat: user.lat,
      lng: user.lng,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/update-profile (protected)
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { name, phone, lat, lng } = req.body;
    const user = await User.findByPk(req.user.id);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (lat !== undefined) user.lat = lat;
    if (lng !== undefined) user.lng = lng;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        lat: user.lat,
        lng: user.lng,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
