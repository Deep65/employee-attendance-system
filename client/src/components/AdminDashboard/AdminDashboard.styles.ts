export const styles = {
  loaderBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  errorAlert: {
    mb: 2,
  },
  card: {
    height: "100%",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  icon: {
    mr: 1,
  },
  tableContainer: (isMobile: boolean) => ({
    maxHeight: isMobile ? 400 : 600,
    overflow: "auto",
  }),
  attendanceAbsent: {
    mt: 1,
  },
  monthlyStats: {
    mt: 1,
  },
};
