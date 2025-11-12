import { Typography, Box } from "@mui/material";

interface PageHeadingProps {
  headingText: string;
}

const PageHeading = ({ headingText }: PageHeadingProps) => {
  return (
    <Box sx={{ mb: 5, flexGrow: 1 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: "primary.main",
          letterSpacing: "0.025em",
        }}
      >
        {headingText}
      </Typography>
    </Box>
  );
};

export default PageHeading;
