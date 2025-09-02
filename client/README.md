# Employee Leave & Attendance Management System - Frontend

A modern React frontend for the Employee Leave & Attendance Management System built with Vite, TypeScript, and Material-UI.

## 🚀 Features

### 👤 Authentication

- JWT-based authentication
- Login and registration forms
- Protected routes with role-based access
- Automatic token management

### 📊 Dashboards

- **Employee Dashboard**: Personal attendance, leave balance, and quick actions
- **Admin Dashboard**: Company-wide statistics, pending requests, and employee overview

### 🕒 Attendance Management

- Daily check-in/check-out functionality
- Attendance history with filtering
- Real-time status updates
- Hours worked calculation

### 📅 Leave Management

- Apply for leave with date picker
- Leave type selection (Vacation, Sick, Work from Home)
- Leave request history
- Admin approval/rejection system

### 🎨 UI/UX Features

- Material-UI design system
- Responsive layout
- Dark/Light theme support
- Loading states and error handling
- Form validation

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API communication
- **Day.js** for date handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 4000

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # React components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Layout.tsx
│   │   ├── EmployeeDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── Attendance.tsx
│   │   ├── LeaveManagement.tsx
│   │   ├── AdminLeaveManagement.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Employees.tsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── package.json
└── README.md
```

## 🔐 Authentication Flow

1. User visits the application
2. If not authenticated, redirected to login page
3. After successful login, JWT token is stored in localStorage
4. Token is automatically included in API requests
5. Protected routes check for valid token
6. Logout clears token and redirects to login

## 🎯 Key Components

### AuthContext

- Manages authentication state
- Provides login/logout functions
- Handles token storage and validation

### ProtectedRoute

- Wraps components that require authentication
- Supports role-based access control
- Redirects unauthenticated users to login

### Layout

- Main application layout with navigation
- Responsive sidebar navigation
- User profile menu with logout

### API Service

- Centralized API communication
- Automatic token injection
- Error handling and response interceptors

## 🎨 UI Components

All components are built with Material-UI and follow consistent design patterns:

- **Cards**: For displaying grouped information
- **Tables**: For data display with sorting and filtering
- **Dialogs**: For forms and confirmations
- **Snackbars**: For notifications
- **Loading States**: For better UX during API calls

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend communicates with the backend API through:

- **Authentication**: `/auth/login`, `/auth/register`
- **Attendance**: `/attendance/*`
- **Leave Management**: `/leaves/*`
- **Dashboard**: `/dashboard/*`

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

3. Configure environment variables for production API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.
