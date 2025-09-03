---
# 🏢 Employee Leave & Attendance Management System – Backend

Backend service for managing employee leave requests, attendance tracking, and role-based access control. Built with **Node.js, Express, TypeScript, and MongoDB**.
---

## 🚀 Features

- JWT-based authentication
- Role-based access: Admin and Employee
- Employee leave request management
- Attendance check-in/out tracking
- Automatic leave balance calculation
- Secure password hashing with bcrypt

---

## 🛠️ Tech Stack

- **Node.js & TypeScript** – backend runtime
- **Express.js** – API framework
- **MongoDB + Mongoose** – database & ODM
- **JWT** – authentication
- **bcryptjs** – password hashing

---

## 📁 Project Structure

```
src/
├── config/          # Database and environment configuration
├── controllers/     # Business logic handlers (user, leave, attendance, dashboard)
├── custom-types/    # TypeScript interfaces and types
├── enums/           # Application enums (roles, leave types, status)
├── middlewares/     # Express middlewares (auth, error handling)
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── scripts/         # Database seeding
├── utils/           # Utility functions (JWT, helpers)
└── index.ts         # Application entry point
```

---

## 🔧 Setup & Installation

### Prerequisites

- Node.js v14+
- MongoDB (local or cloud)
- npm or yarn

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/Deep65/employee-attendance-system
cd employee-attendance-system/server
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**
   Create a `.env` file in `server/`:

```env
MONGO_URI=mongodb://localhost:27017/employee-attendance-system
JWT_SECRET=your-super-secret-jwt-key
PORT=4000
```

4. **Seed the database**

```bash
npm run seed
```

5. **Start development server**

```bash
npm run dev
```

Server will run on `http://localhost:4000`.

---

## 📚 API Endpoints

### Authentication

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login user

### Attendance

- `POST /attendance/check-in` – Employee check-in
- `POST /attendance/check-out` – Employee check-out
- `GET /attendance/my-attendance` – Employee attendance history
- `GET /attendance/today` – Employee today’s status

### Leave Management

- `POST /leaves/apply` – Employee applies for leave
- `GET /leaves/my-leaves` – Employee leave history
- `GET /leaves/all` – Admin view of all leave requests
- `PATCH /leaves/:leaveId/approve` – Admin approves leave
- `PATCH /leaves/:leaveId/reject` – Admin rejects leave

### Dashboard

- `GET /dashboard/admin` – Admin dashboard
- `GET /dashboard/employee` – Employee dashboard

### Health Check

- `GET /health` – Server status check

---

## 🔐 Authentication

Protected routes require **Bearer token** in headers:

```
Authorization: Bearer <your-jwt-token>
```

---

## 🧰 Postman Collection

A Postman collection is available for testing all API endpoints:

- Import `postman_collection.json` from the repository
- Contains all authentication, attendance, leave, and dashboard endpoints
- Includes sample request bodies and headers for quick testing

---

## 👤 Test Credentials (after seeding)

- **Admin:** [admin@company.com](mailto:admin@company.com) / admin123
- **Employee:** [john.doe@company.com](mailto:john.doe@company.com) / employee123
- **Employee:** [jane.smith@company.com](mailto:jane.smith@company.com) / employee123

---

## 📊 Business Rules

### Leave

- Default 20 days/year
- Working days exclude weekends
- Deducted on approval
- Cannot exceed balance

### Attendance

- Single check-in/check-out per day
- Cannot check-out before check-in
- Hours automatically calculated

---

## ⚡ Scripts

- `npm run dev` – Start development with hot reload
- `npm run build` – Build for production
- `npm start` – Run production server
- `npm run seed` – Seed database with mock data

---

## 👨‍💻 Author

**Deep Gandhi**

- Email: [deepgandhi65@gmail.com](mailto:deepgandhi65@gmail.com)

---

If you want, I can **also create a similar Postman section for the client README** to document API usage from the frontend perspective.

Do you want me to do that too?
