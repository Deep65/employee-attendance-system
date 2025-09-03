import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AccessTime,
  EventNote,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { dashboardAPI, attendanceAPI } from "../../services/api";
import type { EmployeeDashboard as EmployeeDashboardType } from "../../types";
import { styles } from "./EmployeeDashboard.styles";

export const EmployeeDashboard = () => {
  const [dashboardData, setDashboardData] =
    useState<EmployeeDashboardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await dashboardAPI.getEmployeeDashboard();
      setDashboardData(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch dashboard data"
          : "Failed to fetch dashboard data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    setAttendanceLoading(true);
    try {
      await attendanceAPI.checkIn();
      await fetchDashboardData();
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
      await fetchDashboardData();
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

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={styles.errorAlert}>
        {error}
      </Alert>
    );
  }

  if (!dashboardData) return null;

  const { user, todayAttendance, pendingLeaves } = dashboardData;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}!
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card>
            <CardContent>
              <Box sx={styles.cardHeader}>
                <EventNote color="primary" sx={styles.cardIcon} />
                <Typography variant="h6">Leave Balance</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {user.leaveBalance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                days remaining
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={styles.leaveUsedText}
              >
                Used: {user.totalLeaveDaysUsed} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card>
            <CardContent>
              <Box sx={styles.cardHeader}>
                <AccessTime color="primary" sx={styles.cardIcon} />
                <Typography variant="h6">Today's Status</Typography>
              </Box>
              <Box sx={styles.chipRow}>
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
              {todayAttendance.checkIn && (
                <Typography variant="body2" color="text.secondary">
                  Check-in:{" "}
                  {new Date(todayAttendance.checkIn).toLocaleTimeString()}
                </Typography>
              )}
              {todayAttendance.checkOut && (
                <Typography variant="body2" color="text.secondary">
                  Check-out:{" "}
                  {new Date(todayAttendance.checkOut).toLocaleTimeString()}
                </Typography>
              )}
              {todayAttendance.hoursWorked > 0 && (
                <Typography variant="body2" color="text.secondary">
                  Hours worked: {todayAttendance.hoursWorked.toFixed(2)}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card>
            <CardContent>
              <Box sx={styles.cardHeader}>
                <EventNote color="primary" sx={styles.cardIcon} />
                <Typography variant="h6">Pending Leaves</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {pendingLeaves}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                requests pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={styles.actionsBox}>
                {!todayAttendance.isCheckedIn ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCheckIn}
                    disabled={attendanceLoading}
                    startIcon={<CheckCircle />}
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
                    size={isMobile ? "medium" : "large"}
                  >
                    Check Out
                  </Button>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    You have completed today's attendance
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
