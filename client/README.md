# 🏢 Employee Management System - Frontend

A modern React frontend for the Employee Leave & Attendance Management System. Built with **React 18, TypeScript, and Material-UI (MUI)**, featuring role-based dashboards and responsive design.

## 🚀 Features

### 🔐 Authentication System

- **Login & Registration:** Clean forms with validation
- **JWT Token Management:** Automatic storage and injection
- **Protected Routes:** Role-based access control

### 👤 Role-Based Dashboards

#### Employee Dashboard

- **Personal Metrics:** Leave balance, attendance status
- **Quick Actions:** Check-in/out buttons, apply for leave
- **Status Indicators:** Today's attendance, pending requests

#### Admin Dashboard

- **Leave Management:** Pending requests with approve/reject actions
- **Real-time Data:** Live updates on system activity

### 📅 Leave Management Interface

- **Interactive Date Picker:** Easy date picker selection
- **Leave Type Selection:** Vacation, Sick Leave, Work from Home
- **Reason Input:** Text area with validation
- **Request History:** Sortable table with status indicators
- **Admin Actions:** One-click approve/reject

### 🕒 Attendance Tracking

- **One-Click Check-in/Out**
- **Real-time Status:** Current attendance state display
- **History Table:** Filterable attendance records
- **Statistics:** Monthly hours, total days worked
- **Visual Indicators:** Status badges and progress bars

### 🎨 UI/UX Design

- **Material-UI Components:** Consistent design system
- **Responsive Layout:** Mobile-first design approach
- **Loading States:** Skeleton loaders and progress indicators
- **Error Handling:** User-friendly error messages

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety and better developer experience
- **Vite** - Lightning-fast development and build tool
- **Material-UI (MUI)** - Comprehensive React UI library
- **React Router v6** - Client-side routing with nested routes
- **Axios** - Promise-based HTTP client with interceptors
- **Day.js** - Lightweight date manipulation library

## 📁 Project Structure

```
src/
├── components/ # React components
│ ├── AdminDashboard/ # Admin dashboard pages/components
│ │ └── AdminDashboard.tsx
│ ├── AdminLeaveManagement/ # Admin leave management components
│ │ └── AdminLeaveManagement.tsx
│ ├── Attendance/ # Attendance management
│ │ ├── Attendance.tsx
│ │ └── AttendanceHistory.tsx
│ ├── Dashboard/ # Common dashboard components
│ │ └── Dashboard.tsx
│ ├── EmployeeDashboard/ # Employee dashboard pages/components
│ │ └── EmployeeDashboard.tsx
│ ├── LeaveManagement/ # Leave management
│ │ ├── LeaveManagement.tsx
│ │ └── LeaveForm.tsx
│ ├── Login/ # Login components
│ │ └── Login.tsx
│ ├── Registration/ # Registration components
│ │ └── Register.tsx
├── contexts/ # React Context providers
│ └── AuthContext.tsx # Authentication state management
├── services/ # External service integrations
│ └── api.ts # API service with Axios
├── types/ # TypeScript type definitions
│ └── index.ts # Shared types and interfaces
├── App.tsx # Main application component
├── main.tsx # Application entry point
└── index.css # Global styles
```

## 🔧 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend server running at `http://localhost:4000`

### Installation Steps

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the client root:

   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🎯 Key Components

### ProtectedRoute Component

```typescript
// Wrapper for route protection with role validation
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}
```

### API Service

```typescript
// Centralized API configuration with interceptors
const apiService = {
  // Authentication
  login: (credentials: LoginData) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;

  // Attendance
  checkIn: () => Promise<AttendanceResponse>;
  checkOut: () => Promise<AttendanceResponse>;
  getAttendance: () => Promise<AttendanceData[]>;

  // Leave Management
  applyLeave: (leaveData: LeaveRequest) => Promise<LeaveResponse>;
  getLeaves: () => Promise<LeaveData[]>;
  approveLeave: (leaveId: string) => Promise<void>;
  rejectLeave: (leaveId: string) => Promise<void>;

  // Dashboard
  getEmployeeDashboard: () => Promise<EmployeeDashboardData>;
  getAdminDashboard: () => Promise<AdminDashboardData>;
};
```

## 🔐 Authentication Flow

### User Journey

1. **Initial Load:** Check for existing token in localStorage
2. **Login Process:** Validate credentials and store JWT token
3. **Route Protection:** Verify token and role for protected routes
4. **API Requests:** Automatically inject Bearer token
5. **Logout:** Clear token and redirect to login page

## 🎨 UI Components & Design

### Material-UI Theme Configuration

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
```

## 🌐 API Integration

### Axios Configuration

```typescript
// API base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

## 📱 Responsive Design

### Breakpoint Strategy

- **Mobile First:** Base styles for mobile devices
- **Tablet:** 768px and up - Adjusted layout and spacing
- **Desktop:** 1024px and up - Full layout with sidebar
- **Large Desktop:** 1440px and up - Optimized for larger screens

### Example Responsive Component

```typescript
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      {/* Card content */}
    </Card>
  </Grid>
</Grid>

<Box sx={{
  display: { xs: 'block', md: 'flex' },
  gap: 2,
  p: { xs: 2, md: 3 }
}}>
  {/* Responsive content */}
</Box>
```

## ⚡ Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run dev:host     # Start dev server accessible on network

# Production
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality
npm run lint:fix     # Auto-fix ESLint issues
npm run type-check   # Run TypeScript compiler check

# Testing (if configured)
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
```

## 🚀 Production Deployment

### Build Optimization

```bash
# Create production build
npm run build

# Build output will be in dist/ directory
# - Minified JavaScript and CSS
# - Optimized images and assets
# - Generated service worker (if configured)
```

### Hosting Platforms

#### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
npm run build
netlify deploy --prod --dir=dist
```

#### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

#### Traditional Hosting

```bash
# Build and copy dist/ folder to web server
npm run build
# Upload dist/ contents to your web server
```

## 🔧 Configuration

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
});
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Commit Convention

```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add or update tests
```

## 👨‍💻 Author

**Deep Gandhi**

- Email: [deepgandhi65@gmail.com](mailto:deepgandhi65@gmail.com)

---

For backend API documentation, see the [Server README](../server/README.md).
