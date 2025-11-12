import arrowLeft from "../assets/arrow-left.svg";
import { useState,
    //  useEffect
     } from "react";
// import suite from "../validations/loginValidation";
import { 
    // Link,
     useNavigate,
    //   useParams
     } from "react-router-dom";
// import { useSendOtpMutation } from "../redux/api/auth.api";
// import UserNotFoundModal from "../components/UserNotFoundModal";

import { Box, Typography, TextField, Button, FormControl, Stack, Container,
    //  CircularProgress
     } from "@mui/material";

// import accounts from "../accounts";
// import FormUserRegistration from "../components/FormUserRegistration";
// import { useGetAccountFeaturesQuery } from "../redux/api/features.api";
// import { getAuthFeatures } from "../services/featuresService";
// import useUserRegistration from "../hooks/useUserRegistration";

const Login = ({ loginTitle = "כניסה לאיזור הניהול", 
    // isDashboard = true
 }) => {
//   const { accountName } = useParams();
//   const accountId = accounts[accountName];
  const [
    // idNumber,
     ,setIdNumber] = useState("");
  const [
    // showNotFoundModal
    , setShowNotFoundModal] = useState(false);

  // User registration state management
//   const userRegistration = useUserRegistration();

  // Function to handle modal close - preserves form state for user convenience
  const handleModalClose = () => {
    setShowNotFoundModal(false);
    // Form state is preserved when modal is closed
    // This allows users to reopen and continue where they left off
  };

//   const validationResult = suite.get();

  const navigate = useNavigate();

//   const {
//     data: accountFeaturesData,
//     isLoading: isAccountFeaturesLoading,
//     isError: isAccountFeaturesError,
//   } = useGetAccountFeaturesQuery(accountId);

  // Use features service for authentication features
//   const authFeatures = getAuthFeatures(accountFeaturesData, isDashboard);
//   const { excludePhoneFromLogin, showUserRegistrationInNotFoundPopup } = authFeatures;

//   const [phoneNumber, setPhoneNumber] = useState(excludePhoneFromLogin ? undefined : "");

//   const [sendOtp, { isSuccess: isSendProcessed, data: sendOtpData, isLoading: isSendOtpProcessing, error, isError }] =
//     useSendOtpMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    runValidate(name, value);
    if (name === "id") setIdNumber(value);
    // if (name === "phone") setPhoneNumber(value);
  };

  const runValidate = (name, value) => {
    // if (value === "") {
    //   return;
    // } else {
    //   suite({ [name]: value }, name);
    // }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // sendOtp({
    //   accountId: parseInt(accountId),
    //   userIdNumber: idNumber,
    //   userPhoneNumber: phoneNumber,
    // });
  };

//   useEffect(() => {
// if (isSendProcessed) {
//   suite.reset();
//   navigate(`../otp`, {
//     state: {
//       userIdNumber: idNumber,
//       userPhoneNumber: phoneNumber,
//     },
//   });
// }
//   }, [isSendProcessed]);

//   useEffect(() => {
//     if (isError) {
//       if (error?.status === 404) {
//         setShowNotFoundModal(true);
//       } else {
//         window.toast.error("שגיאה בפרטי ההתחברות. אנא נסה שוב.");
//       }
//     }
//   }, [isError]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "custom.header",
            fontSize: { xs: "20px", md: "23px" },
            fontWeight: 500,
          }}
        >
          {loginTitle}
        </Typography>
          <Box
            component="form"
            onSubmit={handleSendOtp}
            noValidate
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              minWidth: "275px",
              maxWidth: "300px",
            }}
          >
            <Stack spacing={3} width="100%">
                <FormControl fullWidth>
                  <TextField
                    name="phone"
                    type="text"
                    id="phoneInput"
                    placeholder="טלפון נייד"
                    onChange={handleChange}
                    // error={validationResult.hasErrors("phone") && phoneNumber !== ""}
                    // helperText={phoneNumber !== "" && validationResult.getError("phone")}
                    inputProps={{
                      maxLength: 10,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                    }}
                  />
                </FormControl>

              <FormControl fullWidth 
            //   error={validationResult.hasErrors("id") && idNumber !== ""}
              >
                <TextField
                  name="id"
                  type="text"
                  id="idInput"
                  placeholder="מספר תעודת זהות"
                  onChange={handleChange}
                  error={
                    // validationResult.hasErrors("id") && idNumber !== ""
                    false
                }
                //  helperText={idNumber !== "" && validationResult.getError("id")}
                  inputProps={{
                    maxLength: 9,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </FormControl>
{/* 
              {isError && validationResult.isValid() && error?.data?.message === "מספר טלפון ותעודת זהות לא תואמים" && (
                <Typography color="error" align="center">
                  {error?.data?.message}
                </Typography>
              )} */}
            </Stack>

            <Button
            //   disabled={!validationResult.isValid()}
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: "35px",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>שלחו קוד לנייד</Typography>
                <Box component="img" src={arrowLeft} alt="Arrow Left" sx={{ cursor: "pointer" }} />
              </Box>
            </Button>
          </Box>
        
      </Box>
        {/* <UserNotFoundModal open={showNotFoundModal} onClose={handleModalClose}>
            {showUserRegistrationInNotFoundPopup && (
          <Stack direction="column" gap={3}>
            <Typography variant="body1" sx={{ minHeight: 80 }}>
              נראה כי אינך רשום.ה במאגר העובדים המורשים למילוי טופס הבקשה לקרן סיוע
            </Typography>

            <Link to="../../2" style={{ width: "100%" }}>
              <Button variant="contained" color="primary" fullWidth>
                להרשמה
              </Button>
            </Link>
          </Stack>
        )}
      </UserNotFoundModal> */}
    </Container>
  );
};

export default Login;
