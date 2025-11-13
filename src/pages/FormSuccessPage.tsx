import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const FormSuccessPage = () => {
  const { formId } = useParams<{ formId: string | undefined }>();
  const { isSubmitted = false } = useAppSelector((state) => state.formData.forms[formId || ""]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isSubmitted) {
      navigate(`/forms/${formId}`);
    }
  }, [isSubmitted, navigate, formId]);

  return (
    <Box
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "flex-start",
        },
        paddingLeft: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 2,
          width: "50%",
          marginLeft: 0,
        }}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h4" component="h1" dir="rtl">
          הטופס נשלח בהצלחה!
        </Typography>
        <Typography variant="body1" dir="rtl">
          תודה על מילוי הטופס. נחזור אליך בהקדם.
        </Typography>
      </Box>
    </Box>
  );
};

export default FormSuccessPage;
