/**
 * LifeLink Demo Seed Script
 *
 * Run: node seed.js
 *
 * Seeds 3 demo doctors near Tadepalligudem, Andhra Pradesh
 * for testing the Antigravity nearest-doctor assignment.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const demoDoctors = [
  {
    name: 'Dr. Priya Sharma',
    email: 'priya@lifelink.com',
    phone: '+91 9876500001',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'General Physician',
    isAvailable: true,
    // 1.2 km from Tadepalligudem center (17.0329° N, 81.5228° E)
    lat: 17.0400,
    lng: 81.5280,
    location: { type: 'Point', coordinates: [81.5280, 17.0400] },
  },
  {
    name: 'Dr. Ramesh Kumar',
    email: 'ramesh@lifelink.com',
    phone: '+91 9876500002',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Emergency Medicine',
    isAvailable: true,
    // 3.5 km away
    lat: 17.0100,
    lng: 81.5500,
    location: { type: 'Point', coordinates: [81.5500, 17.0100] },
  },
  {
    name: 'Dr. Anita Rao',
    email: 'anita@lifelink.com',
    phone: '+91 9876500003',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Cardiology',
    isAvailable: true,
    // 6.8 km away
    lat: 17.0800,
    lng: 81.4900,
    location: { type: 'Point', coordinates: [81.4900, 17.0800] },
  },
];

const demoUser = {
  name: 'Ravi Kumar',
  email: 'ravi@lifelink.com',
  phone: '+91 9876543210',
  password: 'test123',
  role: 'user',
  lat: 17.0329,
  lng: 81.5228,
  location: { type: 'Point', coordinates: [81.5228, 17.0329] },
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing demo data
    await User.deleteMany({ email: { $in: [...demoDoctors.map(d => d.email), demoUser.email] } });
    console.log('🗑️  Cleared old demo data');

    // Create user
    await User.create(demoUser);
    console.log(`👤 Created user: ${demoUser.name} (${demoUser.email} / test123)`);

    // Create doctors
    for (const doc of demoDoctors) {
      await User.create(doc);
      console.log(`🩺 Created doctor: ${doc.name} – ${doc.specialty} (${doc.email} / doctor123)`);
    }

    console.log('\n🎉 Seed complete! Antigravity will assign Dr. Priya Sharma (nearest, 1.2km) to Ravi\'s SOS.\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
