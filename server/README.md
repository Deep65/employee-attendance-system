# 🏢 Employee Management System - Backend API

Backend service for the Employee Leave & Attendance Management System. Built with **Node.js, Express, TypeScript, and MongoDB**.

## 🚀 Features

### 🔐 Authentication & Security

- JWT-based authentication with role-based access control
- Two roles: Admin and Employee
- Secure password hashing with bcryptjs
- Protected routes with middleware validation

### 📅 Leave Request Management

- **Employee Functions:**
  - Apply for leave with date ranges
  - Select leave types (Sick, Vacation, Work from Home)
  - View personal leave history
- **Admin Functions:**
  - View all leave requests
  - Approve or reject requests
  - Automatic leave balance management
- **Validations:**
  - Past date prevention
  - Overlapping leave validation
  - Leave balance verification
  - Working days calculation (excludes weekends)

### 🕒 Attendance Tracking

- Daily check-in and check-out functionality
- Hours worked calculation
- Attendance history tracking

### 📊 Dashboard Analytics

- **Admin Dashboard:**
  - Total employees count
  - Pending leave requests
  - Daily attendance overview
- **Employee Dashboard:**
  - Remaining leave balance
  - Today's attendance status
  - Leave request summaries

## 🛠️ Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs
- **Development:** nodemon, ESLint, Prettier

## 📁 Project Structure

```
src/
├── config/              # Database and environment configuration
│   └── database.ts
├── controllers/         # Business logic handlers
│   ├── user.controller.ts
│   ├── attendance.controller.ts
│   ├── leave.controller.ts
│   └── dashboard.controller.ts
├── custom-types/        # TypeScript interfaces and types
│   ├── user.types.ts
│   ├── leave.types.ts
│   └── attendance.types.ts
├── enums/              # Application enums
│   ├── user-role.enum.ts
│   ├── leave-type.enum.ts
│   └── leave-status.enum.ts
├── middlewares/        # Express middlewares
│   └── auth.middleware.ts
├── models/             # Mongoose schemas and models
│   ├── user.model.ts
│   ├── leave.model.ts
│   └── attendance.model.ts
├── routes/             # API route definitions
│   ├── user.routes.ts
│   ├── attendance.routes.ts
│   ├── leave.routes.ts
│   └── dashboard.routes.ts
├── scripts/            # Database utilities
│   └── seed.ts
├── utils/              # Utility functions
│   └── jwt.ts
└── index.ts            # Application entry point
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn package manager

### Installation Steps

1. **Navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the server root:

   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/employee-attendance-system

   # JWT Configuration
   JWT_SECRET=your-super-secure-jwt-secret-key-here

   # Server Configuration
   PORT=4000
   NODE_ENV=development
   ```

4. **Database Setup**

   ```bash
   # Seed database with test data
   npm run seed
   ```

5. **Start Development Server**

   ```bash
   # Development with hot reload
   npm run dev

   # Production build and start
   npm run build && npm start
   ```

The API server will be available at `http://localhost:4000`

## 📚 API Endpoints

### Authentication Routes

```http
POST /auth/register     # Register new user
POST /auth/login        # User authentication
```

### Attendance Management

```http
POST /attendance/check-in      # Employee check-in
POST /attendance/check-out     # Employee check-out
GET  /attendance/my-attendance # Personal attendance history
GET  /attendance/today         # Today's attendance status
```

### Leave Management

```http
POST   /leaves/apply                # Apply for leave (Employee)
GET    /leaves/my-leaves           # Personal leave history (Employee)
GET    /leaves/all                 # All leave requests (Admin)
PATCH  /leaves/:leaveId/approve    # Approve leave (Admin)
PATCH  /leaves/:leaveId/reject     # Reject leave (Admin)
```

### Dashboard Data

```http
GET /dashboard/admin      # Admin dashboard statistics
GET /dashboard/employee   # Employee dashboard data
```

### System Health

```http
GET /health              # API health check
```

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Example Login Request:

```javascript
POST /auth/login
Content-Type: application/json

{
  "email": "admin@company.com",
  "password": "admin123"
}
```

### Example Protected Request:

```javascript
GET /dashboard/employee
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 👤 Test User Accounts

After running the seed script, these accounts are available:

```javascript
// Admin Account
{
  "email": "admin@company.com",
  "password": "admin123",
  "role": "admin"
}

// Employee Accounts
{
  "email": "john.doe@company.com",
  "password": "employee123",
  "role": "employee"
}
{
  "email": "jane.smith@company.com",
  "password": "employee123",
  "role": "employee"
}
```

## 📊 Business Logic & Rules

### Leave Balance System

- **Initial Balance:** 20 days per employee per year
- **Calculation:** Working days only (weekends excluded)
- **Deduction:** Automatic on leave approval
- **Validation:** Cannot exceed available balance

### Attendance System

- **Check-in Rules:** One per day, prevents duplicates
- **Check-out Rules:** Requires prior check-in
- **Hours Calculation:** Automatic based on check-in/out times
- **Weekend Handling:** System tracks but doesn't enforce

### Date Validations

- **Past Dates:** Leave requests cannot be for past dates
- **Overlapping:** Cannot request leave that conflicts with approved/pending requests
- **Date Format:** ISO date format validation (YYYY-MM-DD)

## 🧪 API Testing

### Using Postman/Thunder Client

1. **Authentication Flow:**

   ```javascript
   // 1. Login
   POST /auth/login
   {
     "email": "admin@company.com",
     "password": "admin123"
   }

   // 2. Use returned token for subsequent requests
   Authorization: Bearer <received-token>
   ```

2. **Attendance Operations:**

   ```javascript
   // Check-in
   POST /attendance/check-in
   Authorization: Bearer <token>

   // Check-out
   POST /attendance/check-out
   Authorization: Bearer <token>
   ```

3. **Leave Management:**
   ```javascript
   // Apply for leave
   POST / leaves / apply;
   Authorization: Bearer <
     token >
     {
       startDate: "2024-03-15",
       endDate: "2024-03-17",
       leaveType: "vacation",
       reason: "Family vacation",
     };
   ```

### Postman Collection

Import the provided `postman_collection.json` file for complete API testing suite with pre-configured requests and sample data.

## ⚡ Available Scripts

```bash
npm run dev         # Start development server with hot reload
npm run build       # Compile TypeScript to JavaScript
npm start           # Start production server
npm run seed        # Populate database with test data
npm run lint        # Run ESLint for code quality
```

## 🚀 Production Deployment

### Environment Variables

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-production-jwt-secret-minimum-32-characters
PORT=4000
```

### Build and Deploy

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 👨‍💻 Author

**Deep Gandhi**

- Email: [deepgandhi65@gmail.com](mailto:deepgandhi65@gmail.com)

---

For frontend integration details, see the [Client README](../client/README.md).
