import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add, EventNote } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { leaveAPI } from "../services/api";
import type { Leave, LeaveRequest } from "../types";

export const LeaveManagement: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leaveForm, setLeaveForm] = useState<LeaveRequest>({
    startDate: "",
    endDate: "",
    leaveType: "vacation",
    reason: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const data = await leaveAPI.getMyLeaves();
      setLeaves(data.leaves);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to fetch leave requests"
          : "Failed to fetch leave requests";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLeave = async () => {
    setSubmitting(true);
    try {
      await leaveAPI.applyForLeave(leaveForm);
      setOpenDialog(false);
      setLeaveForm({
        startDate: "",
        endDate: "",
        leaveType: "vacation",
        reason: "",
      });
      await fetchLeaves();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to submit leave request"
          : "Failed to submit leave request";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
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

  const getLeaveTypeLabel = (type: string) => {
    return type.replace("_", " ").toUpperCase();
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leave Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexDirection={isMobile ? "column" : "row"}
            gap={2}
          >
            <Typography variant="h6">My Leave Requests</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              fullWidth={isMobile}
            >
              Apply for Leave
            </Button>
          </Box>

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
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No leave requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  leaves.map((leave) => (
                    <TableRow key={leave._id}>
                      <TableCell>
                        {getLeaveTypeLabel(leave.leaveType)}
                      </TableCell>
                      <TableCell>
                        {new Date(leave.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(leave.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {isMobile
                          ? leave.reason.length > 20
                            ? `${leave.reason.substring(0, 20)}...`
                            : leave.reason
                          : leave.reason}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={leave.status.toUpperCase()}
                          color={
                            getStatusColor(leave.status) as
                              | "default"
                              | "primary"
                              | "secondary"
                              | "error"
                              | "info"
                              | "success"
                              | "warning"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(leave.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Apply for Leave Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Apply for Leave</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Start Date"
                    value={
                      leaveForm.startDate ? dayjs(leaveForm.startDate) : null
                    }
                    onChange={(date: Dayjs | null) =>
                      setLeaveForm({
                        ...leaveForm,
                        startDate: date?.format("YYYY-MM-DD") || "",
                      })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="End Date"
                    value={leaveForm.endDate ? dayjs(leaveForm.endDate) : null}
                    onChange={(date: Dayjs | null) =>
                      setLeaveForm({
                        ...leaveForm,
                        endDate: date?.format("YYYY-MM-DD") || "",
                      })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Leave Type</InputLabel>
                    <Select
                      value={leaveForm.leaveType}
                      label="Leave Type"
                      onChange={(e) =>
                        setLeaveForm({
                          ...leaveForm,
                          leaveType: e.target.value as
                            | "vacation"
                            | "sick"
                            | "work_from_home",
                        })
                      }
                    >
                      <MenuItem value="vacation">Vacation</MenuItem>
                      <MenuItem value="sick">Sick Leave</MenuItem>
                      <MenuItem value="work_from_home">Work from Home</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Reason"
                    multiline
                    rows={3}
                    value={leaveForm.reason}
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, reason: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitLeave}
            variant="contained"
            disabled={
              submitting ||
              !leaveForm.startDate ||
              !leaveForm.endDate ||
              !leaveForm.reason
            }
          >
            {submitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
