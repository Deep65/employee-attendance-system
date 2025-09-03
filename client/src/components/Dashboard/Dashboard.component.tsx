import { useAuth } from "../../hooks/useAuth";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";
import { EmployeeDashboard } from "../EmployeeDashboard/EmployeeDashboard.component";

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return user.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />;
};
