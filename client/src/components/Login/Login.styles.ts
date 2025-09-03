import type { SxProps, Theme } from "@mui/material";

export const loginStyles: Record<string, SxProps<Theme>> = {
  containerBox: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: 4,
    width: "100%",
  },
  innerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formBox: {
    mt: 1,
    width: "100%",
  },
  submitButton: {
    mt: 3,
    mb: 2,
  },
  alert: {
    width: "100%",
    mb: 2,
  },
  demoBox: {
    mt: 4,
    textAlign: "center",
  },
};
