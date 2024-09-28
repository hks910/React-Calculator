import { createTheme } from "@mui/material";

const themeII = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000", // Set the background color to black
    },
    primary: { main: "#fff149" },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e", // Main grey color for unselected buttons
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000", // Set the background color to black
          border: "2px solid white", // Add white border to Paper component
        },
      },
    },
  },
  typography: {
    button: {
      fontSize: "1rem",
    },
  },
});




export default themeII;
