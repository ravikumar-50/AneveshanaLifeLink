# LifeLink Server – TechX Backend

Node.js + Express + MongoDB backend with **Antigravity** nearest-doctor auto-assignment.

## Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your **MongoDB Atlas URI**:

```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lifelink
JWT_SECRET=lifelink_techx_super_secret_key_2026
PORT=5000
```

### 3. Seed demo data (3 doctors near Tadepalligudem)

```bash
node seed.js
```

### 4. Start the server

```bash
npm run dev        # Development (nodemon)
npm start          # Production
```

Server runs at: **http://localhost:5000**

---

## API Endpoints

### Auth

| Method | URL                  | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Register user/doctor       |
| POST   | `/api/auth/login`    | Login                      |
| GET    | `/api/auth/profile`  | Get profile (JWT required) |

### Emergency (🔴 Antigravity Logic Here)

| Method | URL                       | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| POST   | `/api/emergency/create`   | **Create SOS → auto-assigns nearest doctor** |
| GET    | `/api/emergency/:id`      | Get emergency details                        |
| GET    | `/api/emergency/user/all` | Get user's emergency history                 |

### Doctor

| Method | URL                            | Description                    |
| ------ | ------------------------------ | ------------------------------ |
| GET    | `/api/doctor/nearby?lat=&lng=` | Get doctors sorted by distance |
| POST   | `/api/doctor/availability`     | Toggle online/offline          |
| POST   | `/api/doctor/accept/:id`       | Manually accept emergency      |

### Other

| Method | URL             | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/api/contacts` | Emergency contacts |
| GET    | `/api/guides`   | Help guides        |

---

## Antigravity Logic

When `POST /api/emergency/create` is called with `{ lat, lng }`:

1. All doctors with `isAvailable: true` are fetched
2. **Haversine formula** calculates distance from patient to each doctor
3. **Nearest doctor** is automatically assigned
4. Emergency status → `doctor_assigned`
5. Doctor marked `isAvailable: false`

**Response:**

```json
{
  "message": "Emergency created and doctor assigned automatically",
  "antigravity": {
    "doctorAssigned": true,
    "doctorName": "Dr. Priya Sharma",
    "specialty": "General Physician",
    "distance": "1.2 km"
  }
}
```

---

## Demo Credentials

| Role               | Email               | Password  |
| ------------------ | ------------------- | --------- |
| User               | ravi@lifelink.com   | test123   |
| Doctor 1 (nearest) | priya@lifelink.com  | doctor123 |
| Doctor 2           | ramesh@lifelink.com | doctor123 |
| Doctor 3           | anita@lifelink.com  | doctor123 |
