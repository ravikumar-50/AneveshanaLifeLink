# LifeLink Emergency Response App - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up the LifeLink app with a MySQL database for storing registration and login information.

## Prerequisites

### Install MySQL Server

1. **Download MySQL** from https://www.mysql.com/downloads/mysql/
2. **Install** MySQL Community Server (default port: 3306)
3. **Verify Installation**:
   ```bash
   mysql --version
   ```

### Verify Node.js and npm

```bash
node --version
npm --version
```

## Step 1: Database Setup

### Option A: Using Command Line (Recommended)

1. Open Command Prompt/PowerShell
2. Run the SQL setup script:
   ```bash
   cd c:\Users\krkts\Downloads\LifeLink Emergency Response App (1)\server
   mysql -u root -p < database-setup.sql
   ```
   (Enter your MySQL password when prompted)

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Create new connection or use existing
3. Open `server\database-setup.sql`
4. Execute the script (Ctrl+Shift+Enter)

### Option C: Using phpMyAdmin

1. Go to http://localhost/phpmyadmin
2. Create new database: `lifelink_db`
3. Import `database-setup.sql` file

## Step 2: Configure Environment Variables

Edit `server\.env`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production

# MySQL Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=lifelink_db
```

Replace `your_mysql_password` with your actual MySQL password.

## Step 3: Install Backend Dependencies

```bash
cd c:\Users\krkts\Downloads\LifeLink Emergency Response App (1)\server
npm install
```

## Step 4: Start the Backend Server

```bash
npm run dev
```

Expected output:
```
✅ MySQL database synced
🚀 LifeLink server running on http://localhost:5000
```

## Step 5: Start the Frontend

In a new terminal:

```bash
cd c:\Users\krkts\Downloads\LifeLink Emergency Response App (1)
npm run dev
```

The app will be at: http://localhost:5173/

## Testing the Setup

### Using Postman or Insomnia

#### 1. Register a New User

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "Test@123",
  "role": "user"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user"
  }
}
```

#### 2. Login User

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Test@123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user",
    "lat": 0,
    "lng": 0
  }
}
```

#### 3. Get User Profile (Protected - Requires Token)

```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer {token_from_login}
```

## Database Tables

Your MySQL database now has these tables:

### `users` Table
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR | User's name |
| email | VARCHAR | Email (unique) |
| phone | VARCHAR | Phone number |
| password | VARCHAR | Hashed password |
| role | ENUM | user/doctor/volunteer |
| lat | DECIMAL | Latitude |
| lng | DECIMAL | Longitude |
| isAvailable | BOOLEAN | Availability status |
| specialty | VARCHAR | Doctor's specialty |
| createdAt | TIMESTAMP | Creation time |
| updatedAt | TIMESTAMP | Last update time |

### `emergencies` Table
Stores emergency records (lat, lng, description, status)

### `contacts` Table
Stores user's emergency contacts

### `guides` Table
Stores help guides and first aid information

## Troubleshooting

### "Error: connect ECONNREFUSED"
- MySQL is not running
- **Solution**: Start MySQL Server from Services or Command Prompt

### "Error: ER_ACCESS_DENIED_FOR_USER"
- Wrong database credentials in `.env`
- **Solution**: Verify `DB_USER` and `DB_PASSWORD` in `.env`

### "Error: ER_NO_DB_ERROR"
- Database `lifelink_db` doesn't exist
- **Solution**: Run `database-setup.sql` again

### "Port 3306 is already in use"
- Another MySQL instance is running or port conflict
- **Solution**: Change `DB_PORT` in `.env` or kill the process using port 3306

### Registration Form Not Working
- Make sure backend is running: `npm run dev` in server folder
- Check browser console for errors (F12)
- Verify CORS is enabled in backend (already configured)

## File Structure

```
server/
├── config/
│   └── database.js          # MySQL connection config
├── models/
│   ├── UserSQL.js           # User model for MySQL
│   └── User.js              # Old MongoDB model (deprecated)
├── routes/
│   ├── auth-sql.js          # Updated auth routes for MySQL
│   └── auth.js              # Old auth routes (deprecated)
├── middleware/
│   └── auth.js              # Updated to use SQL user model
├── .env                     # Environment variables
├── database-setup.sql       # Database creation script
├── DATABASE_SETUP.md        # Setup instructions
└── package.json
```

## Next Steps

1. ✅ Database is set up with user registration/login
2. Create emergency response routes
3. Integrate doctor dashboard
4. Add real-time notifications
5. Deploy to production

## Support

For issues or questions, check the logs:

**Backend logs** - Check terminal running `npm run dev` in server folder
**Frontend logs** - Open browser DevTools (F12) → Console tab

---

Your app is now ready to register and login users with MySQL database! 🎉
