import type { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  errorAlert: {
    mb: 2,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  cardIcon: {
    mr: 1,
  },
  leaveUsedText: {
    mt: 1,
  },
  chipRow: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  actionsBox: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
  },
};
