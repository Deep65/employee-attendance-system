import React from "react";
import { useAuth } from "../hooks/useAuth";
import { AdminDashboard } from "./AdminDashboard";
import { EmployeeDashboard } from "./EmployeeDashboard";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return user.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />;
};
