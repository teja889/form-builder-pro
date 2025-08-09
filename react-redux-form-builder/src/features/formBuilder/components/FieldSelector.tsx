import { Paper, Typography, Button, Stack, Divider } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { addField } from "../formBuilderSlice";
import type { FieldType } from "../../../types";

const fieldTypes: { label: string; type: FieldType }[] = [
  { label: "Text Field", type: "text" },
  { label: "Number Input", type: "number" },
  { label: "Textarea", type: "textarea" },
  { label: "Select Dropdown", type: "select" },
  { label: "Radio Group", type: "radio" },
  { label: "Checkbox", type: "checkbox" },
  { label: "Date Picker", type: "date" },
];

export const FieldSelector = () => {
  const dispatch = useAppDispatch();

  const handleAddField = (type: FieldType) => {
    dispatch(addField({ type }));
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Field Types
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1}>
        {fieldTypes.map(({ label, type }) => (
          <Button
            key={type}
            variant="outlined"
            onClick={() => handleAddField(type)}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
};
