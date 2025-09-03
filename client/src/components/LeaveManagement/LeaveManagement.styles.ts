import type { SxProps, Theme } from "@mui/material";

export const leaveStyles = {
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  } as SxProps<Theme>,

  headerBox: (isMobile: boolean): SxProps<Theme> => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    flexDirection: isMobile ? "column" : "row",
    gap: 2,
  }),

  tableContainer: (isMobile: boolean): SxProps<Theme> => ({
    maxHeight: isMobile ? 400 : 600,
    overflow: "auto",
  }),

  alert: {
    mb: 2,
  } as SxProps<Theme>,
};
