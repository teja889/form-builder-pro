import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Button,
  ListItemButton, // 1. Add this import
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import { useAppSelector } from "../app/hooks";

export const MyFormsPage = () => {
  const forms = useAppSelector((state) => state.forms.forms);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Saved Forms
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {forms.length === 0 ? (
        <Box textAlign="center" sx={{ p: 3 }}>
          <Typography variant="h6" color="text.secondary">
            You have no saved forms.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/create"
            sx={{ mt: 2 }}
          >
            Create Your First Form
          </Button>
        </Box>
      ) : (
        <List>
          {forms.map((form, index) => (
            // 2. This is the corrected block of code
            <ListItem
              key={form.id}
              disablePadding
              divider={index < forms.length - 1}
            >
              <ListItemButton component={RouterLink} to={`/preview/${form.id}`}>
                <ListItemText
                  primary={form.name}
                  secondary={`Created on: ${format(
                    new Date(form.createdAt),
                    "MMMM d, yyyy h:mm a"
                  )}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};
