// import { useSelector } from "react-redux";
import { Outlet, 
    // Navigate
 } from "react-router-dom";
import { Box } from "@mui/material";
import logoUrl from "../assets/logo.png";
import svgContent from "../assets/loginBg.svg?raw";
const LoginLayout = () => {
//   const { userData } = useSelector((state) => state?.user);

//   if (userData) {
//     return <Navigate to="dashboard" />;
//   }

//   const logoUrl = brandingAssets.logo ? `data:image/png;base64,${brandingAssets.logo}` : "";

//   // Convert base64 SVG to actual SVG content
//   const getSvgContent = () => {
//     if (!brandingAssets.loginBg) return null;
//     try {
//       const decodedSvg = atob(brandingAssets.loginBg);
//       return decodedSvg;
//     } catch (error) {
//       console.error("Error decoding SVG:", error);
//       return null;
//     }
//   };

//   const svgContent = getSvgContent();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      {/* Right Section - Hidden on mobile */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          height: "100%",
          bgcolor: "white",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* SVG Image with rounded top-left corner */}
        <Box
          sx={{
            borderTopRightRadius: "10rem",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            bgcolor: "custom.supportingColor",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: "75%", mx: "auto" }}>
            {svgContent && (
              <Box component="div" dangerouslySetInnerHTML={{ __html: svgContent }} sx={{ width: "100%", height: "auto" }} />
            )}
          </Box>
        </Box>
      </Box>

      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}
      >
        <Box sx={{ mt: 1, mr: 3 }}>
          <Box
            id="authLogo"
            component="img"
            src={logoUrl}
            alt="Logo"
            sx={{
              height: "100%",
              objectFit: "contain",
              maxWidth: "95px",
            }}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginLayout;
