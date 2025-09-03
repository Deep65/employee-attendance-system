---
# 🏢 Employee Leave & Attendance Management System – Frontend

A modern React frontend for managing employee leave requests and attendance tracking. Built with **React 18, TypeScript, and Material-UI (MUI)**, featuring role-based dashboards for Admins and Employees.
---

## 🚀 Features

### 👤 Authentication

- JWT-based authentication
- Login and registration forms
- Protected routes with role-based access
- Automatic token storage and injection

### 📊 Dashboards

- **Employee Dashboard**: Personal attendance, leave balance, and quick actions
- **Admin Dashboard**: Company-wide statistics, pending requests, and employee overview

### 🕒 Attendance Management

- Daily check-in/check-out functionality
- Attendance history with filtering
- Real-time attendance status
- Hours worked calculation

### 📅 Leave Management

- Apply for leave with date picker
- Select leave type (Vacation, Sick, Work from Home)
- View leave request history
- Admin approval/rejection workflow

### 🎨 UI/UX

- Material-UI design system for consistent styling
- Responsive layout for all devices
- Dark/Light theme support
- Loading indicators and error handling
- Form validation with user feedback

---

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development & build
- **Material-UI (MUI)** for UI components
- **React Router v6** for navigation
- **Axios** for API calls
- **Day.js** for date manipulation

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI & page components
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── Layout.tsx
│   ├── EmployeeDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── Attendance.tsx
│   ├── LeaveManagement.tsx
│   ├── AdminLeaveManagement.tsx
│   ├── ProtectedRoute.tsx
│   └── Employees.tsx
├── contexts/             # React Contexts for state management
│   └── AuthContext.tsx
├── services/             # API services
│   └── api.ts
├── types/                # TypeScript types
│   └── index.ts
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn
- Backend server running at `http://localhost:4000`

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Deep65/employee-attendance-system
cd employee-attendance-system/client
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

5. **Preview production build**

```bash
npm run preview
```

---

## 🔐 Authentication Flow

1.  User visits the app
2.  Redirected to login if unauthenticated
3.  JWT stored in `localStorage` after login
4.  Token automatically included in API requests
5.  Protected routes validate token and user role
6.  Logout clears token and redirects to login

---

## 🎯 Key Components

### AuthContext

- Manages authentication state
- Provides login/logout functions
- Handles token storage and validation

### ProtectedRoute

- Wraps components requiring authentication
- Supports role-based access
- Redirects unauthenticated users

### Layout

- Main app layout with sidebar navigation
- User profile menu with logout

### API Service

- Centralized API requests with Axios
- Automatic token injection
- Error handling and interceptors

---

## 🎨 UI Components

- **Cards**: Display grouped information
- **Tables**: For data display with sorting/filtering
- **Dialogs**: Forms and confirmation modals

---

## 🌐 API Integration

- **Authentication:** `/auth/login`, `/auth/register`
- **Attendance:** `/attendance/*`
- **Leave Management:** `/leaves/*`
- **Dashboard:** `/dashboard/*`

## ⚡ Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

---

## 🚀 Deployment

1. Build the frontend:

```bash
npm run build
```

2. Deploy the `dist/` folder to hosting service

3. Set environment variables for production API endpoints
