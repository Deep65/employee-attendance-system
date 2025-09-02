import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { People, EventNote, AccessTime, TrendingUp } from "@mui/icons-material";
import { dashboardAPI } from "../services/api";
import type { AdminDashboard as AdminDashboardType } from "../types";

export const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await dashboardAPI.getAdminDashboard();
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

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

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!dashboardData) return null;

  const {
    totalEmployees,
    pendingLeaves,
    todayAttendance,
    monthlyStats,
    recentLeaves,
  } = dashboardData;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Employees */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <People color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Employees</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {totalEmployees}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                registered employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Leaves */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EventNote color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending Leaves</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {pendingLeaves}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                requests awaiting approval
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Attendance */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccessTime color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Today's Attendance</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {todayAttendance.present}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                present out of {todayAttendance.total}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Absent: {todayAttendance.absent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Average */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Monthly Average</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {monthlyStats.averageAttendance.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                attendance rate
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Working days: {monthlyStats.totalWorkingDays}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Leave Requests */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Leave Requests
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
                      <TableCell>Employee</TableCell>
                      <TableCell>Leave Type</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentLeaves.map((leave) => (
                      <TableRow key={leave._id}>
                        <TableCell>
                          {typeof leave.employee === "object"
                            ? leave.employee.name
                            : "Unknown Employee"}
                        </TableCell>
                        <TableCell>
                          {leave.leaveType.replace("_", " ").toUpperCase()}
                        </TableCell>
                        <TableCell>
                          {new Date(leave.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(leave.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={leave.status.toUpperCase()}
                            color={getStatusColor(leave.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {isMobile
                            ? leave.reason.length > 20
                              ? `${leave.reason.substring(0, 20)}...`
                              : leave.reason
                            : leave.reason}
                        </TableCell>
                      </TableRow>
                    ))}
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
