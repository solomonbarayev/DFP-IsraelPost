import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, } from "react-router-dom";
import formsBg from "../assets/formsBg.svg";
import logoUrl from "../assets/logo.png";

const FormsLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        p: 3,
        display: "flex",
      }}
    >
      {!isMobile  && (
        <>
          <Box
            component="img"
            src={formsBg}
            alt="Background"
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              right: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
              background:
                "linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .95) 45%, rgb(255, 255, 255) 100%)",
            }}
          />
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box
            id="formLogo"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 3,
              maxWidth: "120px",
              mr: "auto",
            }}
          >
            <Box component="img" src={logoUrl} alt="Logo" sx={{ width: "100%" }} />
          </Box>
        </Stack>
        <Outlet />
      </Box>
    </Box>
  );
};

export default FormsLayout;
