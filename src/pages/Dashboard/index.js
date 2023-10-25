import { NavigateNext } from "@mui/icons-material";
import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import { blue, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
    },
    no: {
      main: yellow[900],
    },
    normal: {
      main: blue[900],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          //   color: "white",
        },
      },
      defaultProps: {
        variant: "outlined",
        endIcon: <NavigateNext />,
      },
    },
  },
});

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box></Box>
    </ThemeProvider>
  );
};

export default Dashboard;
