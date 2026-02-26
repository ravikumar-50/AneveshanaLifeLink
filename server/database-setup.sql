-- Create the LifeLink database
CREATE DATABASE IF NOT EXISTS lifelink_db;
USE lifelink_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'doctor', 'volunteer') DEFAULT 'user',
  lat DECIMAL(10, 8) DEFAULT 0,
  lng DECIMAL(11, 8) DEFAULT 0,
  isAvailable BOOLEAN DEFAULT true,
  specialty VARCHAR(255) DEFAULT '',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on email for faster login queries
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_role ON users(role);

-- Create emergency table (for future use)
CREATE TABLE IF NOT EXISTS emergencies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create contacts table (for emergency contacts)
CREATE TABLE IF NOT EXISTS contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  relation VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create guides table (for help guides)
CREATE TABLE IF NOT EXISTS guides (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT,
  category VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Display table structure
DESCRIBE users;
