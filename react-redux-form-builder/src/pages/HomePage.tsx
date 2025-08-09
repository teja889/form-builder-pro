import { Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// This function tells the browser to start downloading the code for the CreateFormPage.
const prefetchCreatePage = () => {
  import("./createFormPage");
};

export const HomePage = () => (
  <Box textAlign="center" p={5}>
    <Typography variant="h3" gutterBottom>
      Welcome to Form Builder Pro
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" mb={4}>
      Create, preview, and manage your dynamic forms with ease.
    </Typography>
    <Button
      variant="contained"
      size="large"
      component={RouterLink}
      to="/create"
      // Add the onMouseEnter event handler here
      onMouseEnter={prefetchCreatePage}
    >
      Get Started
    </Button>
  </Box>
);
