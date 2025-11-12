import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { useRootContext } from "../contexts/RootContext";
import logoUrl from "../assets/logo.png";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { brandingAssets } = useRootContext();
  const isDashboardPage = location.pathname.includes("/dashboard");

  // const logoUrl = brandingAssets.logo ? `data:image/png;base64,${brandingAssets.logo}` : "";


  const handleBack = () => {
    if (isDashboardPage) {
      navigate(`/dashboard`);
    } else {
      navigate(-1);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        {logoUrl && (
          <Box
            component="img"
            src={logoUrl}
            alt="Logo"
            sx={{
              height: "100%",
              objectFit: "contain",
              maxWidth: "150px",
              mb: 4,
            }}
          />
        )}
        <Typography variant="h1" color="primary" sx={{ fontSize: "4rem", fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {isDashboardPage ? "הדשבורד המבוקש לא נמצא" : "הדף שחיפשת לא נמצא"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {isDashboardPage ? "ייתכן שהדשבורד הועבר, נמחק או שהכתובת שגויה" : "ייתכן שהדף הועבר, נמחק או שהכתובת שגויה"}
        </Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            borderRadius: "35px",
            px: 4,
            py: 1.5,
          }}
        >
          {isDashboardPage ? "חזרה לדשבורד הראשי" : "חזרה לדף הקודם"}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
