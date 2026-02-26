require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

// Import SQL models
const User = require('./models/UserSQL');

const authRoutes = require('./routes/auth-sql');
const emergencyRoutes = require('./routes/emergency');
const doctorRoutes = require('./routes/doctor');
const contactsRoutes = require('./routes/contacts');
const guidesRoutes = require('./routes/guides');

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/guides', guidesRoutes);

// ─── Root health check ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🚑 LifeLink API – TechX',
    version: '1.0.0',
    status: 'running',
    routes: {
      auth: '/api/auth',
      emergency: '/api/emergency',
      doctor: '/api/doctor',
      contacts: '/api/contacts',
      guides: '/api/guides',
    },
  });
});

// ─── Not found handler ─────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ─── Connect to MySQL and start ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ MySQL database synced');
  app.listen(PORT, () => {
    console.log(`🚀 LifeLink server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});
