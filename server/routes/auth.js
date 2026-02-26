const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, lat, lng } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'user',
      lat: lat || 0,
      lng: lng || 0,
      location: {
        type: 'Point',
        coordinates: [lng || 0, lat || 0], // GeoJSON: [lng, lat]
      },
    });

    res.status(201).json({
      message: 'Registration successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
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

// GET /api/auth/profile  (protected)
router.get('/profile', protect, async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    lat: user.lat,
    lng: user.lng,
    isAvailable: user.isAvailable,
  });
});

module.exports = router;
