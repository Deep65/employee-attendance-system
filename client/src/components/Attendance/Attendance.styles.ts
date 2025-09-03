import type { SxProps, Theme } from "@mui/material";

export const attendanceStyles = {
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  } as SxProps<Theme>,

  cardHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  } as SxProps<Theme>,

  chipIconMargin: {
    mr: 1,
  } as SxProps<Theme>,

  filterBox: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    mb: 3,
  } as SxProps<Theme>,

  tableContainer: {
    overflow: "auto",
  } as SxProps<Theme>,

  tableContainerMaxHeight: (isMobile: boolean): SxProps<Theme> => ({
    maxHeight: isMobile ? 400 : 600,
  }),

  alert: {
    mb: 2,
  } as SxProps<Theme>,
};
