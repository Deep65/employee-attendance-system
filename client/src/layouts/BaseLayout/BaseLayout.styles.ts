import type { SxProps } from "@mui/material";

const drawerWidth = 240;

export const sxBaseStyles = {
  root: {
    display: "flex",
  },
  appBar: {
    width: { md: `calc(100% - ${drawerWidth}px)` },
    ml: { md: `${drawerWidth}px` },
  },
  menuButton: {
    mr: 2,
    display: { md: "none" },
  },
  navBox: {
    width: { md: drawerWidth },
    flexShrink: { md: 0 },
  },
  drawerTemporary: {
    display: { xs: "block", md: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
  drawerPermanent: {
    display: { xs: "none", md: "block" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
  main: {
    flexGrow: 1,
    p: { xs: 2, md: 3 },
    width: { md: `calc(100% - ${drawerWidth}px)` },
  },
  title: {
    flexGrow: 1,
  },
} satisfies SxProps;
