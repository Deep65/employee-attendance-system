// types.ts
export interface User {
  _id?: string;
  name?: string;
  email?: string;
  role: "admin" | "employee";
  leaveBalance?: number;
  totalLeaveDaysUsed?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
}

export interface AuthResponse {
  token: string;
  role: "admin" | "employee";
}

export interface Attendance {
  _id: string;
  employee: string | User;
  date: string;
  checkIn?: string;
  checkOut?: string;
  hoursWorked?: number;
  isPresent: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Leave {
  _id: string;
  employee: string | User;
  startDate: string;
  endDate: string;
  leaveType: "vacation" | "sick" | "work_from_home";
  reason: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string | User;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  startDate: string;
  endDate: string;
  leaveType: "vacation" | "sick" | "work_from_home";
  reason: string;
}

export interface AdminDashboard {
  totalEmployees: number;
  pendingLeaves: number;
  todayAttendance: {
    present: number;
    absent: number;
    total: number;
  };
  monthlyStats: {
    averageAttendance: number;
    totalWorkingDays: number;
  };
  recentLeaves: Leave[];
}

export interface EmployeeDashboard {
  user: User;
  todayAttendance: {
    isCheckedIn: boolean;
    isCheckedOut: boolean;
    checkIn?: string;
    checkOut?: string;
    hoursWorked: number;
  };
  monthlyStats: {
    totalHours: number;
    presentDays: number;
  };
  pendingLeaves: number;
}

export interface TodayAttendanceResponse {
  attendance: Attendance | null;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
}

export interface AttendanceHistoryResponse {
  attendance: Attendance[];
  totalHours: number;
  totalDays: number;
}
