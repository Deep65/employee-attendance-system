import axios from "axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  Leave,
  LeaveRequest,
  AdminDashboard,
  EmployeeDashboard,
  TodayAttendanceResponse,
  AttendanceHistoryResponse,
} from "../types";

const API_BASE_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle auth errors
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

export const authAPI = {
  login: (credentials: LoginRequest): Promise<AuthResponse> =>
    api.post("/auth/login", credentials).then((res) => res.data),

  register: (userData: RegisterRequest): Promise<void> =>
    api.post("/auth/register", userData).then((res) => res.data),

  getProfile: (): Promise<User> =>
    api.get("/auth/profile").then((res) => res.data),
};

export const attendanceAPI = {
  checkIn: (): Promise<{ message: string; checkIn: string }> =>
    api.post("/attendance/check-in").then((res) => res.data),

  checkOut: (): Promise<{
    message: string;
    checkOut: string;
    hoursWorked: number;
  }> => api.post("/attendance/check-out").then((res) => res.data),

  getTodayAttendance: (): Promise<TodayAttendanceResponse> =>
    api.get("/attendance/today").then((res) => res.data),

  getMyAttendance: (
    month?: number,
    year?: number
  ): Promise<AttendanceHistoryResponse> => {
    const params = new URLSearchParams();
    if (month) params.append("month", month.toString());
    if (year) params.append("year", year.toString());
    return api
      .get(`/attendance/my-attendance?${params}`)
      .then((res) => res.data);
  },
};

export const leaveAPI = {
  applyForLeave: (
    leaveData: LeaveRequest
  ): Promise<{ message: string; leave: Leave }> =>
    api.post("/leaves/apply", leaveData).then((res) => res.data),

  getMyLeaves: (status?: string): Promise<{ leaves: Leave[] }> => {
    const params = status ? `?status=${status}` : "";
    return api.get(`/leaves/my-leaves${params}`).then((res) => res.data);
  },

  getAllLeaves: (
    status?: string,
    employee?: string
  ): Promise<{ leaves: Leave[] }> => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (employee) params.append("employee", employee);
    return api.get(`/leaves/all?${params}`).then((res) => res.data);
  },

  approveLeave: (leaveId: string): Promise<{ message: string; leave: Leave }> =>
    api.patch(`/leaves/${leaveId}/approve`).then((res) => res.data),

  rejectLeave: (
    leaveId: string,
    rejectionReason: string
  ): Promise<{ message: string; leave: Leave }> =>
    api
      .patch(`/leaves/${leaveId}/reject`, { rejectionReason })
      .then((res) => res.data),
};

export const dashboardAPI = {
  getAdminDashboard: (): Promise<AdminDashboard> =>
    api.get("/dashboard/admin").then((res) => res.data),

  getEmployeeDashboard: (): Promise<EmployeeDashboard> =>
    api.get("/dashboard/employee").then((res) => res.data),
};

export default api;
