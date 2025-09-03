# 🏢 Employee Leave & Attendance Management System

A comprehensive system for managing employee leave requests and attendance tracking with role-based access control.

## 🚀 Features

### 👤 Authentication & Roles

- JWT-based authentication
- Two roles: Admin and Employee
- Role-based route protection
- Secure password hashing with bcrypt

### 📅 Leave Request Module

- **Employees can apply for leave with:**
  - Start and end dates
  - Leave type (Sick, Vacation, Work from Home)
  - Reason for leave
- **Validations:**
  - Cannot request leave for past dates
  - Cannot overlap with existing approved/pending leaves
  - Leave balance validation
  - Working days calculation (excludes weekends)
- **Admin can:**
  - View all leave requests
  - Approve or reject leave requests
  - Automatic leave balance deduction on approval

### 🕒 Attendance Module

- **Employees can:**
  - Check-in and check-out daily
  - View their attendance history
  - View today's attendance status
- **System tracks:**
  - Hours worked per day
  - Total working hours per month
  - Present/absent status
  - Prevents duplicate check-ins/check-outs

### 📊 Dashboard

- **Admin View:**
  - Total employees count
  - Pending leave requests
  - Daily attendance overview
  - Monthly attendance statistics
  - Recent leave requests
- **Employee View:**
  - Remaining leave balance
  - Today's attendance status
  - Monthly working hours
  - Approved leave summary
  - Pending leave requests count

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** Built-in validation with custom logic

### Development Tools

- **Hot Reloading:** nodemon
- **TypeScript:** Full TypeScript support
- **Code Quality:** ESLint + Prettier
- **Path Aliases:** Clean import paths

## 📁 Project Structure

```
server/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic handlers
│   │   ├── user.controller.ts
│   │   ├── attendance.controller.ts
│   │   ├── leave.controller.ts
│   │   └── dashboard.controller.ts
│   ├── custom-types/    # TypeScript interfaces
│   │   ├── user.types.ts
│   │   ├── leave.types.ts
│   │   └── attendance.types.ts
│   ├── enums/          # Application enums
│   │   ├── user-role.enum.ts
│   │   ├── leave-type.enum.ts
│   │   └── leave-status.enum.ts
│   ├── middlewares/    # Express middlewares
│   │   └── auth.middleware.ts
│   ├── models/         # Mongoose schemas
│   │   ├── user.model.ts
│   │   ├── leave.model.ts
│   │   └── attendance.model.ts
│   ├── routes/         # API route definitions
│   │   ├── user.routes.ts
│   │   ├── attendance.routes.ts
│   │   ├── leave.routes.ts
│   │   └── dashboard.routes.ts
│   ├── scripts/        # Database seeding
│   │   └── seed.ts
│   ├── utils/          # Utility functions
│   │   └── jwt.ts
│   └── index.ts        # Application entry point
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Deep65/employee-attendance-system
   cd employee-attendance-system
   ```

2. **Install dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory:

   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/employee-attendance-system

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here

   # Server
   PORT=4000
   ```

4. **Seed the database**

   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:4000`

## 📚 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Attendance

- `POST /attendance/check-in` - Check in for the day
- `POST /attendance/check-out` - Check out for the day
- `GET /attendance/my-attendance` - Get personal attendance history
- `GET /attendance/today` - Get today's attendance status

### Leave Management

- `POST /leaves/apply` - Apply for leave (Employee)
- `GET /leaves/my-leaves` - Get personal leave history (Employee)
- `GET /leaves/all` - Get all leave requests (Admin)
- `PATCH /leaves/:leaveId/approve` - Approve leave request (Admin)
- `PATCH /leaves/:leaveId/reject` - Reject leave request (Admin)

### Dashboard

- `GET /dashboard/admin` - Admin dashboard data
- `GET /dashboard/employee` - Employee dashboard data

### Health Check

- `GET /health` - Server health check

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Test Credentials (after seeding)

- **Admin:** admin@company.com / admin123
- **Employee:** john.doe@company.com / employee123
- **Employee:** jane.smith@company.com / employee123

## 📊 Business Rules

### Leave Balance Logic

- Default leave balance: 20 days per year
- Working days calculation excludes weekends
- Leave balance is automatically deducted on approval
- Cannot apply for leave if insufficient balance

### Attendance Rules

- One check-in/check-out per day
- Hours worked calculated automatically
- Cannot check-out without checking in first
- Cannot check-in twice in the same day

### Validation Rules

- Cannot request leave for past dates
- Cannot overlap with existing approved/pending leaves
- Leave requests require approval from admin
- All dates are validated for proper format

## 🧪 Testing the API

### Using Postman/Thunder Client

1. **Register/Login**

   ```json
   POST /auth/login
   {
     "email": "admin@company.com",
     "password": "admin123"
   }
   ```

2. **Check In**

   ```json
   POST /attendance/check-in
   Authorization: Bearer <token>
   ```

3. **Apply for Leave**

   ```json
   POST /leaves/apply
   Authorization: Bearer <token>
   {
     "startDate": "2024-03-01",
     "endDate": "2024-03-03",
     "leaveType": "vacation",
     "reason": "Family vacation"
   }
   ```

4. **Get Dashboard Data**
   ```json
   GET /dashboard/employee
   Authorization: Bearer <token>
   ```

## 🚀 Production Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start production server**

   ```bash
   npm start
   ```

3. **Environment Variables**
   Make sure to set proper environment variables for production:
   - `MONGO_URI` - Production MongoDB connection string
   - `JWT_SECRET` - Strong, unique JWT secret

---

## 🧰 Postman Collection

A Postman collection is available for testing all API endpoints:

- Import `postman_collection.json` from the repository
- Contains all authentication, attendance, leave, and dashboard endpoints
- Includes sample request bodies and headers for quick testing

---

## 👨‍💻 Author

**Deep Gandhi**

- Email: [deepgandhi65@gmail.com](mailto:deepgandhi65@gmail.com)

---

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run seed` - Seed the database with mock data
