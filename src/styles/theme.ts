import { createTheme } from "@mui/material";

export const appTheme = {
  primary: "#ED6644",
  secondary: "#FFC857",
  light: "#F0F4EF",
  dark: "#0A141F",
  blueColor: "#142163",
  disabledBackground: "#1d252f",
  cardBackground: "#1d252f",
};

export const xtraZoneColor = Object.freeze({
  tone: "#FF4F38",
  cardio: "#FFC044",
  power: "#256993",
});

export const chartTheme = {
  green: "#0F9200",
  yellow: "#FFFF00",
  red: "var(--xtra-red)",
  light: "#CECECE",
  dark: "#0A141F",
};

export default createTheme({
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    subtitle1: {
      color: "#FF5B36",
    },
  },
  palette: {
    primary: {
      main: "#FF5B36",
    },
    secondary: {
      main: "#F0F4EF",
    },
  },
  // brand: "#FF5B36",
  // footerHeight: 50,
  // mobileFooterHeight: 56,
  // sidebarWidth: 200,
  // sidebarMobileHeight: 90,
  // sidebarMobilePadding: 8,
  // participantBorderWidth: 2,
  // mobileTopBarHeight: 52,
  // restingTimer: "#FFC857", // '#03AC13',
  // cardBackground: "#1D252F",
});
