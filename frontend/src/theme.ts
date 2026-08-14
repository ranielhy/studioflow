import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#ffffff",
          paper: "#ffffff",
        },
        primary: {
          main: "#7c3aed",
        },
        text: {
          primary: "#08060d",
          secondary: "#6b6375",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#16171d",
          paper: "#1f2028",
        },
        primary: {
          main: "#c084fc",
        },
        text: {
          primary: "#f3f4f6",
          secondary: "#9ca3af",
        },
      },
    },
  },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
});
