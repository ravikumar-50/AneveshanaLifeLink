const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'doctor', 'volunteer'], default: 'user' },
  // GeoJSON Point for 2dsphere index (Antigravity)
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
  },
  // Plain lat/lng for Haversine fallback
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  specialty: { type: String, default: '' }, // for doctors
  createdAt: { type: Date, default: Date.now },
});

// 2dsphere index for geo queries (Antigravity optimization)
userSchema.index({ location: '2dsphere' });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
