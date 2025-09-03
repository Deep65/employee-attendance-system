import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Person, CheckCircle, Cancel, AccessTime } from "@mui/icons-material";
import { attendanceAPI, dashboardAPI } from "../services/api";
import type {
  Attendance,
  TodayAttendanceResponse,
  EmployeeDashboard as EmployeeDashboardType,
} from "../types";

export const AttendanceComponent = () => {
  const [todayAttendance, setTodayAttendance] =
    useState<TodayAttendanceResponse | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<Attendance[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<{
    totalHours: number;
    presentDays: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchTodayAttendance = useCallback(async () => {
    try {
      const data = await attendanceAPI.getTodayAttendance();
      setTodayAttendance(data);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch today's attendance"
          : "Failed to fetch today's attendance";
      setError(errorMessage);
    }
  }, []);

  const fetchMonthlyStats = useCallback(async () => {
    try {
      const data: EmployeeDashboardType =
        await dashboardAPI.getEmployeeDashboard();
      setMonthlyStats(data.monthlyStats);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch monthly stats"
          : "Failed to fetch monthly stats";
      setError(errorMessage);
    }
  }, []);

  const fetchAttendanceHistory = useCallback(async () => {
    try {
      const data = await attendanceAPI.getMyAttendance(
        selectedMonth,
        selectedYear
      );
      setAttendanceHistory(data.attendance);
      setError("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch attendance history"
          : "Failed to fetch attendance history";
      setError(errorMessage);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTodayAttendance(),
        fetchMonthlyStats(),
        fetchAttendanceHistory(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [fetchTodayAttendance, fetchMonthlyStats, fetchAttendanceHistory]);

  const handleCheckIn = async () => {
    setAttendanceLoading(true);
    try {
      await attendanceAPI.checkIn();
      await fetchTodayAttendance();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Check-in failed"
          : "Check-in failed";
      setError(errorMessage);
    } finally {
      setAttendanceLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setAttendanceLoading(true);
    try {
      await attendanceAPI.checkOut();
      await fetchTodayAttendance();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Check-out failed"
          : "Check-out failed";
      setError(errorMessage);
    } finally {
      setAttendanceLoading(false);
    }
  };

  const getStatusChip = (attendance: Attendance) =>
    attendance.isPresent ? (
      <Chip label="Present" color="success" size="small" />
    ) : (
      <Chip label="Absent" color="default" size="small" />
    );

  const formatTime = (timeString: string) =>
    new Date(timeString).toLocaleTimeString();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={10}>
        {/* Today's Attendance Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccessTime color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Today's Attendance</Typography>
              </Box>

              {todayAttendance && (
                <Box>
                  <Box display="flex" alignItems="center" mb={2}>
                    {todayAttendance.isCheckedIn ? (
                      <Chip
                        icon={<CheckCircle />}
                        label="Checked In"
                        color="success"
                      />
                    ) : (
                      <Chip
                        icon={<Cancel />}
                        label="Not Checked In"
                        color="default"
                      />
                    )}
                  </Box>

                  {todayAttendance.attendance && (
                    <Box>
                      {todayAttendance.attendance.checkIn && (
                        <Typography variant="body2" color="text.secondary">
                          Check-in:{" "}
                          {formatTime(todayAttendance.attendance.checkIn)}
                        </Typography>
                      )}
                      {todayAttendance.attendance.checkOut && (
                        <Typography variant="body2" color="text.secondary">
                          Check-out:{" "}
                          {formatTime(todayAttendance.attendance.checkOut)}
                        </Typography>
                      )}
                      {todayAttendance.attendance.hoursWorked &&
                        todayAttendance.attendance.hoursWorked > 0 && (
                          <Typography variant="body2" color="text.secondary">
                            Hours worked:{" "}
                            {todayAttendance.attendance.hoursWorked.toFixed(2)}
                          </Typography>
                        )}
                    </Box>
                  )}

                  <Box mt={2}>
                    {!todayAttendance.isCheckedIn ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleCheckIn}
                        disabled={attendanceLoading}
                        startIcon={<CheckCircle />}
                        fullWidth
                        size={isMobile ? "medium" : "large"}
                      >
                        Check In
                      </Button>
                    ) : !todayAttendance.isCheckedOut ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleCheckOut}
                        disabled={attendanceLoading}
                        startIcon={<Cancel />}
                        fullWidth
                        size={isMobile ? "medium" : "large"}
                      >
                        Check Out
                      </Button>
                    ) : (
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                      >
                        You have completed today's attendance
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Hours Card */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Person color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">This Month</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {monthlyStats?.totalHours.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                hours worked
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Present: {monthlyStats?.presentDays} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance History (Filters + Table) */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              {/* Filter Attendance History */}
              <Typography variant="h6" gutterBottom>
                Filter Attendance History
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    value={selectedMonth}
                    label="Month"
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={selectedYear}
                    label="Year"
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = new Date().getFullYear() - 2 + i;
                      return (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>

              {/* Attendance History Table */}
              <Typography variant="h6" gutterBottom>
                Attendance History
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{
                  maxHeight: isMobile ? 400 : 600,
                  overflow: "auto",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Check In</TableCell>
                      <TableCell>Check Out</TableCell>
                      <TableCell>Hours Worked</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceHistory.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No attendance records found for the selected period
                        </TableCell>
                      </TableRow>
                    ) : (
                      attendanceHistory.map((attendance) => (
                        <TableRow key={attendance._id}>
                          <TableCell>
                            {new Date(attendance.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusChip(attendance)}</TableCell>
                          <TableCell>
                            {attendance.checkIn
                              ? formatTime(attendance.checkIn)
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {attendance.checkOut
                              ? formatTime(attendance.checkOut)
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {attendance.hoursWorked
                              ? attendance.hoursWorked.toFixed(2)
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
