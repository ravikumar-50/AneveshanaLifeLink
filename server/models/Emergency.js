const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  emergencyType: { type: String, default: 'general' },
  status: {
    type: String,
    enum: ['pending', 'doctor_assigned', 'ambulance_dispatched', 'completed'],
    default: 'pending',
  },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  doctorName: { type: String, default: null },
  distanceKm: { type: Number, default: null }, // Antigravity: distance to assigned doctor
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Emergency', emergencySchema);
