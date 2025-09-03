import type { SxProps, Theme } from "@mui/material";

export const adminLeaveStyles: Record<string, SxProps<Theme>> = {
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  cardContentBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    gap: 2,
  },
  filterControl: {
    minWidth: 150,
  },
  tableContainer: {
    overflow: "auto",
  },
  actionButtonsBox: {
    display: "flex",
    gap: 1,
  },
  alert: {
    mb: 2,
  },
  rejectionTextField: {
    mt: 2,
  },
};
