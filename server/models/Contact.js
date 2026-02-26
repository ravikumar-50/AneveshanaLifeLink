const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  label: { type: String, required: true },
  number: { type: String, required: true },
  type: { type: String, enum: ['ambulance', 'emergency', 'doctor', 'volunteer'], default: 'emergency' },
  color: { type: String, default: '#E53935' },
});

module.exports = mongoose.model('Contact', contactSchema);
