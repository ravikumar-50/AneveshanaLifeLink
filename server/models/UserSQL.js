const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'doctor', 'volunteer'),
    defaultValue: 'user',
  },
  lat: {
    type: DataTypes.DECIMAL(10, 8),
    defaultValue: 0,
  },
  lng: {
    type: DataTypes.DECIMAL(11, 8),
    defaultValue: 0,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  specialty: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'users',
});

// Hash password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Hash password before updating if password is modified
User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Method to compare passwords
User.prototype.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
