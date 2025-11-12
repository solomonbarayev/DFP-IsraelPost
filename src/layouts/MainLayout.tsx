import { Box, Container, Paper, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";


// Styled component for the gradient background
const GradientBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar handleLogout={
        () => {
          console.log("handleLogout");
        }
        } />

      <GradientBackground>
        <Box sx={{ height: 100 }} />
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 40"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="moving-waves">
            <use xlinkHref="#gentle-wave" x="48" y="-1" fill="rgba(255,255,255,0.40)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.35)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.25)" />
            <use xlinkHref="#gentle-wave" x="48" y="8" fill="rgba(255,255,255,0.20)" />
            <use xlinkHref="#gentle-wave" x="48" y="13" fill="rgba(255,255,255,0.15)" />
            <use xlinkHref="#gentle-wave" x="48" y="16" fill="rgba(255,255,255,1)" />
          </g>
        </svg>
      </GradientBackground>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          mt: -20,
          mb: 8,
          px: { xs: 2, lg: 5 },
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 1,
            bgcolor: "background.paper",
            opacity: 0.9,
            height: "100%",
            p: 3,
          }}
        >
          <Box sx={{ height: "100%" }}>
            <Outlet />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
export default MainLayout