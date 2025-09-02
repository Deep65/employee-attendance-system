import React from "react";
import { Dashboard, EventNote } from "@mui/icons-material";
import { BaseLayout } from "./BaseLayout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminMenuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
  { text: "Leave Approvals", icon: <EventNote />, path: "/admin/leaves" },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <BaseLayout menuItems={adminMenuItems} title="Admin Dashboard">
      {children}
    </BaseLayout>
  );
};
