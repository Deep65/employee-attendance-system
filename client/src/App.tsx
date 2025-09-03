import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdminLayout } from "./layouts/AdminLayout/AdminLayout.component";
import { EmployeeLayout } from "./layouts/EmployeeLayout/EmployeeLayout";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { UserRole } from "./types";
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard";
import { AdminLeaveManagement } from "./components/AdminLeaveManagement/AdminLeaveManagement.component";
import { Login } from "./components/Login/Login.component";
import { Registration } from "./components/Registration/Registration.component";
import { EmployeeDashboard } from "./components/EmployeeDashboard/EmployeeDashboard.component";
import { AttendanceComponent } from "./components/Attendance/Attendance.component";
import { LeaveManagement } from "./components/LeaveManagement/LeaveManagement.component";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { theme } from "./theme";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole={UserRole.ADMIN}>
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
          <ProtectedRoute requiredRole={UserRole.EMPLOYEE}>
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

const RootRedirect = () => {
  const { user } = useAuth();

  console.log(user, "user");

  return user ? (
    <Navigate
      to={
        user.role === UserRole.ADMIN
          ? "/admin/dashboard"
          : "/employee/dashboard"
      }
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
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
