# LifeLink Backend Database Setup Guide

## Prerequisites
- MySQL Server installed (download from https://www.mysql.com/downloads/mysql/)
- MySQL running on localhost:3306

## Setup Instructions

### 1. Create the Database

#### Option A: Using MySQL Command Line
```bash
mysql -u root -p < database-setup.sql
```

#### Option B: Using MySQL Workbench or phpMyAdmin
1. Open your MySQL client
2. Run the SQL commands in `database-setup.sql`

### 2. Configure Environment Variables

Edit `.env` file in the server directory with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lifelink_db
JWT_SECRET=your_jwt_secret_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm run dev
```

The server will automatically create/sync the tables based on the Sequelize models.

## Database Structure

### Users Table
Stores user registration and login information:
- `id` - User ID (Primary Key)
- `name` - Full name
- `email` - Email (Unique)
- `phone` - Phone number
- `password` - Hashed password (bcrypt)
- `role` - user, doctor, or volunteer
- `lat`, `lng` - Location coordinates
- `isAvailable` - Availability status
- `specialty` - Doctor specialty
- `createdAt`, `updatedAt` - Timestamps

### Other Tables
- **emergencies** - Emergency records
- **contacts** - Emergency contacts
- **guides** - Help guides

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/update-profile` - Update profile (protected)

### Request/Response Examples

#### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securepassword",
  "role": "user",
  "lat": 40.7128,
  "lng": -74.0060
}

Response:
{
  "message": "Registration successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user"
  }
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user",
    "lat": 40.7128,
    "lng": -74.0060
  }
}
```

## Troubleshooting

### Connection Error: "connect ECONNREFUSED 127.0.0.1:3306"
- Make sure MySQL server is running
- Check mysql host, port, username, password in .env

### Error: "ER_ACCESS_DENIED_FOR_USER"
- Verify your MySQL username and password in .env
- Make sure the user has permission to create/access the database

### Error: "ER_DUP_ENTRY"
- The email already exists in the database
- Use a different email or clear the database

## Next Steps

Once set up:
1. Test registration endpoint with postman/insomnia
2. Test login endpoint
3. Register and login users will be stored in MySQL database
4. Tokens will authenticate users for protected routes
