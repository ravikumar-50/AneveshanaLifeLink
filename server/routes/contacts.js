const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/contacts  – returns all emergency contacts
router.get('/', async (req, res) => {
  try {
    let contacts = await Contact.find();

    // Seed default contacts if DB is empty
    if (!contacts.length) {
      contacts = await Contact.insertMany([
        { label: 'Ambulance', number: '108', type: 'ambulance', color: '#E53935' },
        { label: 'Emergency', number: '112', type: 'emergency', color: '#D97706' },
        { label: 'Local Doctor', number: '+91 9000000000', type: 'doctor', color: '#059669' },
        { label: 'Volunteer', number: '+91 9000011111', type: 'volunteer', color: '#1E3A8A' },
      ]);
    }

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
