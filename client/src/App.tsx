import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./layouts/AdminLayout";
import { EmployeeLayout } from "./layouts/EmployeeLayout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { AdminDashboard } from "./components/AdminDashboard";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { AttendanceComponent } from "./components/Attendance";
import { LeaveManagement } from "./components/LeaveManagement";
import { AdminLeaveManagement } from "./components/AdminLeaveManagement";

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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/leaves" element={<AdminLeaveManagement />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeLayout>
              <Routes>
                <Route path="/dashboard" element={<EmployeeDashboard />} />
                <Route path="/attendance" element={<AttendanceComponent />} />
                <Route path="/leaves" element={<LeaveManagement />} />
                <Route
                  path="/"
                  element={<Navigate to="/employee/dashboard" replace />}
                />
              </Routes>
            </EmployeeLayout>
          </ProtectedRoute>
        }
      />

      {/* Root Route - Redirect based on role */}
      <Route path="/" element={<RootRedirect />} />

      {/* Unauthorized Route */}
      <Route
        path="/unauthorized"
        element={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Unauthorized Access</h1>
            <p>You don't have permission to access this page.</p>
          </div>
        }
      />
    </Routes>
  );
};

const RootRedirect: React.FC = () => {
  const { user } = useAuth();

  console.log(user, "user");

  return user ? (
    <Navigate
      to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"}
      replace
    />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
