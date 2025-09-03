# 🏢 Employee Leave & Attendance Management System

A comprehensive full-stack system for managing employee leave requests and attendance tracking with role-based access control.

## 🚀 Overview

This system provides a complete solution for HR management with separate Admin and Employee interfaces, featuring automated leave calculations, attendance tracking, and comprehensive dashboards.

### Key Features

- **JWT-based Authentication** with role-based access control
- **Leave Management** with automated balance calculations
- **Attendance Tracking** with check-in/out functionality
- **Admin Dashboard** for company-wide oversight
- **Employee Dashboard** for personal management

## 🏗️ System Architecture

```
├── 📁 client/          # React frontend application
├── 📁 server/          # Node.js backend API
└── 📄 README.md        # This file
```

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Material-UI (MUI)** for UI components
- **Vite** for fast development

### Backend

- **Node.js** with TypeScript
- **Express.js** framework
- **MongoDB** with Mongoose ODM
- **JWT** authentication

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Deep65/employee-attendance-system
   cd employee-attendance-system
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run seed          # Seed database with test data
   npm run dev           # Start backend server
   ```

3. **Setup Frontend** (in a new terminal)

   ```bash
   cd client
   npm install
   npm run dev           # Start frontend development server
   ```

4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

## 🔐 Test Credentials

After seeding the database, you can login with:

- **Admin Account:**

  - Email: `admin@company.com`
  - Password: `admin123`

- **Employee Accounts:**
  - Email: `john.doe@company.com` / Password: `employee123`
  - Email: `jane.smith@company.com` / Password: `employee123`

## 📚 API Documentation

The system exposes RESTful APIs for:

- **Authentication**: User registration and login
- **Attendance**: Check-in/out and attendance history
- **Leave Management**: Apply, approve/reject leaves
- **Dashboard**: Admin and employee statistics

For detailed API documentation, see the [Backend README](./server/README.md).

## 🎨 User Interface

### Admin Features

- Company-wide attendance overview
- Leave request management (approve/reject)
- Employee statistics and reports
- Dashboard with key metrics

### Employee Features

- Personal attendance tracking
- Leave application and history
- Dashboard with personal metrics
- Check-in/out functionality

For UI documentation, see the [Frontend README](./client/README.md).

## 📊 Business Rules

### Leave Management

- Default 20 days annual leave balance
- Working days calculation (excludes weekends)
- Automatic balance deduction on approval
- Validation for past dates and overlapping requests

### Attendance Rules

- Single check-in/check-out per day
- Automatic hours calculation
- Cannot check-out without check-in

## 🧪 Testing

Use the provided Postman collection (`server/postman_collection.json`) to test all API endpoints with sample data.

## 🚀 Production Deployment

1. **Backend Deployment**

   ```bash
   cd server
   npm run build
   npm start
   ```

2. **Frontend Deployment**

   ```bash
   cd client
   npm run build
   # Deploy the dist/ folder to your hosting service
   ```

3. **Environment Configuration**
   - Set production MongoDB URI
   - Configure strong JWT secrets
   - Update CORS settings for production domains

## 📁 Repository Structure

- **`/server`** - Backend API server ([Documentation](./server/README.md))
- **`/client`** - Frontend React application ([Documentation](./client/README.md))

## 👨‍💻 Author

**Deep Gandhi**

- Email: [deepgandhi65@gmail.com](mailto:deepgandhi65@gmail.com)
- GitHub: [@Deep65](https://github.com/Deep65)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the individual README files for component-specific help
2. Review the API documentation in the backend README
3. Use the provided Postman collection for API testing
4. Open an issue on GitHub for bugs or feature requests

---

**Need help getting started?** Check out the detailed setup guides in the [Backend](./server/README.md) and [Frontend](./client/README.md) documentation.
