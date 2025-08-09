import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ViewListIcon from "@mui/icons-material/ViewList";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* This is the updated component */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Form Builder Pro
        </Typography>

        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/create"
            startIcon={<AddCircleOutlineIcon />}
          >
            Create Form
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/myforms"
            startIcon={<ViewListIcon />}
          >
            My Forms
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
