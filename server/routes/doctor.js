const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Emergency = require('../models/Emergency');
const { protect, requireRole } = require('../middleware/auth');
const { haversineDistance } = require('../utils/haversine');

// GET /api/doctor/nearby?lat=xx&lng=xx  (protected, any role)
// Returns available doctors sorted by distance – for display on map
router.get('/nearby', protect, async (req, res) => {
  try {
    const { lat, lng, maxKm = 50 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'lat and lng are required' });

    const doctors = await User.find({ role: 'doctor', isAvailable: true }).select('-password');

    const withDistance = doctors
      .map((doc) => ({
        id: doc._id,
        name: doc.name,
        phone: doc.phone,
        specialty: doc.specialty || 'General Physician',
        lat: doc.lat,
        lng: doc.lng,
        distanceKm: haversineDistance(parseFloat(lat), parseFloat(lng), doc.lat, doc.lng),
      }))
      .filter((d) => d.distanceKm <= parseFloat(maxKm))
      .sort((a, b) => a.distanceKm - b.distanceKm);

    res.json({
      count: withDistance.length,
      doctors: withDistance,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/doctor/availability  (protected, doctor only)
// Toggle online/offline availability
router.post('/availability', protect, requireRole('doctor'), async (req, res) => {
  try {
    const { isAvailable } = req.body;
    req.user.isAvailable = isAvailable;
    await req.user.save();
    res.json({
      message: `Status set to ${isAvailable ? 'Online' : 'Offline'}`,
      isAvailable,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/doctor/accept/:emergencyId  (protected, doctor only)
// Doctor manually accepts an emergency
router.post('/accept/:emergencyId', protect, requireRole('doctor'), async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.emergencyId);
    if (!emergency) return res.status(404).json({ message: 'Emergency not found' });
    if (emergency.status !== 'pending') {
      return res.status(400).json({ message: 'Emergency already assigned or completed' });
    }

    emergency.doctorId = req.user._id;
    emergency.doctorName = req.user.name;
    emergency.status = 'doctor_assigned';
    await emergency.save();

    req.user.isAvailable = false;
    await req.user.save();

    res.json({
      message: 'Emergency accepted',
      emergencyId: emergency._id,
      doctorName: req.user.name,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/doctor/emergencies  (protected, doctor only)
// View emergencies assigned to this doctor
router.get('/emergencies', protect, requireRole('doctor'), async (req, res) => {
  try {
    const emergencies = await Emergency.find({ doctorId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('userId', 'name phone');
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
