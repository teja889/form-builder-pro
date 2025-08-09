import { useState } from "react";
import { Typography, Box, Button, Modal, TextField } from "@mui/material";
import { FieldSelector } from "../features/formBuilder/components/FieldSelector";
import { FormCanvas } from "../features/formBuilder/components/FormCanvas";
import { FieldConfigurationPanel } from "../features/formBuilder/components/FieldConfigurationPanel";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addForm } from "../features/savedForms/formSlice";
import { resetBuilder } from "../features/formBuilder/formBuilderSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Style for the modal
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateFormPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { fields } = useAppSelector((state) => state.formBuilder);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveForm = () => {
    if (!formName.trim()) {
      alert("Please enter a form name.");
      return;
    }

    // Construct the final form schema
    const newFormSchema = {
      id: uuidv4(),
      name: formName,
      createdAt: new Date().toISOString(),
      fields: fields,
    };

    // Dispatch actions to save the form and reset the builder
    dispatch(addForm(newFormSchema));
    dispatch(resetBuilder());

    // Close modal and navigate to the "My Forms" page
    handleCloseModal();
    navigate("/myforms");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Create a New Form</Typography>
        {/* The save button now opens the modal */}
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleOpenModal}
          disabled={fields.length === 0}
        >
          Save Form
        </Button>
      </Box>

      {/* --- 3-Column Flexbox Layout --- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "25%" } }}>
          <FieldSelector />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <FormCanvas />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "25%" } }}>
          <FieldConfigurationPanel />
        </Box>
      </Box>

      {/* --- Save Form Modal --- */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="save-form-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="save-form-modal-title" variant="h6" component="h2">
            Save Your Form
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            type="text"
            fullWidth
            variant="standard"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveForm}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
