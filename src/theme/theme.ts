import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom?: {
      header?: string
      input?: string
      button?: string
      cardBg?: string
      supportingColor?: string
    }
  }
}

export const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#cb0006",
      light: "#cb00068c",
      dark: "#004F80",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFD700",
      light: "#494949",
      dark: "#404040",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1f2937",
      secondary: "#4b5563",
    },
    custom: {
      header: "#cb0006",
      input: "#faf2f2",
      button: "#FFD700",
      cardBg: "#faf2f2",
      supportingColor: "#faf2f2",
    },
  },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    h1: {
      fontWeight: 500,
      fontSize: "2.3rem",
      color: "#cb0006",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#000000",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      color: "#000000",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#000000",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
      color: "#000000",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      color: "#000000",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 35,
          padding: 10,
        },
        contained: {
          boxShadow: "none",
          backgroundColor: "#cb0006",
          "&:hover": {
            backgroundColor: "#9B0000",
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
          "& .MuiInputLabel-root": {
            color: "#000000",
            "&.Mui-focused": {
              color: "#000000",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000000",
          "&.Mui-focused": {
            color: "#000000",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

