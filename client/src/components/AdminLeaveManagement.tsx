import React, { useState, useEffect, useCallback } from "react";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { leaveAPI } from "../services/api";
import type { Leave } from "../types";

export const AdminLeaveManagement: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const [actionDialog, setActionDialog] = useState<"approve" | "reject" | null>(
    null
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchLeaves = useCallback(async () => {
    try {
      const status = statusFilter === "all" ? undefined : statusFilter;
      const data = await leaveAPI.getAllLeaves(status);
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
  }, [statusFilter]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves, statusFilter]);

  const handleApprove = async () => {
    if (!selectedLeave) return;

    setProcessing(true);
    try {
      await leaveAPI.approveLeave(selectedLeave._id);
      setActionDialog(null);
      setSelectedLeave(null);
      await fetchLeaves();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to approve leave request"
          : "Failed to approve leave request";
      setError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedLeave) return;

    setProcessing(true);
    try {
      await leaveAPI.rejectLeave(selectedLeave._id, rejectionReason);
      setActionDialog(null);
      setSelectedLeave(null);
      setRejectionReason("");
      await fetchLeaves();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to reject leave request"
          : "Failed to reject leave request";
      setError(errorMessage);
    } finally {
      setProcessing(false);
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

  const openActionDialog = (leave: Leave, action: "approve" | "reject") => {
    setSelectedLeave(leave);
    setActionDialog(action);
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
        Leave Management (Admin)
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
            <Typography variant="h6">All Leave Requests</Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={statusFilter}
                label="Filter by Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
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
                  <TableCell>Employee</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied On</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No leave requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  leaves.map((leave) => (
                    <TableRow key={leave._id}>
                      <TableCell>
                        {typeof leave.employee === "object"
                          ? leave.employee.name
                          : "Unknown Employee"}
                      </TableCell>
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
                          ? leave.reason.length > 15
                            ? `${leave.reason.substring(0, 15)}...`
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
                      <TableCell>
                        {leave.status === "pending" && (
                          <Box
                            display="flex"
                            gap={1}
                            flexDirection={isMobile ? "column" : "row"}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<CheckCircle />}
                              onClick={() => openActionDialog(leave, "approve")}
                              fullWidth={isMobile}
                            >
                              Approve
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              startIcon={<Cancel />}
                              onClick={() => openActionDialog(leave, "reject")}
                              fullWidth={isMobile}
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Approve Dialog */}
      <Dialog
        open={actionDialog === "approve"}
        onClose={() => setActionDialog(null)}
        fullScreen={isMobile}
      >
        <DialogTitle>Approve Leave Request</DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to approve this leave request?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Employee:{" "}
                {typeof selectedLeave.employee === "object"
                  ? selectedLeave.employee.name
                  : "Unknown"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Period: {new Date(selectedLeave.startDate).toLocaleDateString()}{" "}
                - {new Date(selectedLeave.endDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reason: {selectedLeave.reason}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog(null)}>Cancel</Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            color="success"
            disabled={processing}
          >
            {processing ? <CircularProgress size={24} /> : "Approve"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={actionDialog === "reject"}
        onClose={() => setActionDialog(null)}
        fullScreen={isMobile}
      >
        <DialogTitle>Reject Leave Request</DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Please provide a reason for rejecting this leave request:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Rejection Reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog(null)}>Cancel</Button>
          <Button
            onClick={handleReject}
            variant="contained"
            color="error"
            disabled={processing || !rejectionReason.trim()}
          >
            {processing ? <CircularProgress size={24} /> : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
