import { Dashboard, AccessTime, EventNote } from "@mui/icons-material";
import { BaseLayout } from "../BaseLayout/BaseLayout.component";

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

const employeeMenuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/employee/dashboard" },
  { text: "Attendance", icon: <AccessTime />, path: "/employee/attendance" },
  { text: "Leave Requests", icon: <EventNote />, path: "/employee/leaves" },
];

export const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  return (
    <BaseLayout menuItems={employeeMenuItems} title="Employee Portal">
      {children}
    </BaseLayout>
  );
};
