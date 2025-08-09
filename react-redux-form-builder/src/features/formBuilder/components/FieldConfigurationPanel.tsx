import React from "react";
import {
  Paper,
  Typography,
  Divider,
  TextField,
  Stack,
  FormControlLabel,
  Switch,
  Box,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  updateField,
  addOptionToField,
  removeOptionFromField,
  updateOptionInField,
  addValidationRule,
  removeValidationRule,
  updateValidationRule,
} from "../formBuilderSlice";
import type { ValidationRule, FormField } from "../../../types";

// Helper map for validation rules
const availableRules: {
  type: ValidationRule["type"];
  label: string;
  valueType?: "string" | "number";
}[] = [
  { type: "notEmpty", label: "Not Empty" },
  { type: "minLength", label: "Min Length", valueType: "number" },
  { type: "maxLength", label: "Max Length", valueType: "number" },
  { type: "isEmail", label: "Email Format" },
  { type: "customPassword", label: "Password Policy" },
];

// Component for editing select/radio options
const OptionsEditor = ({
  selectedField,
  dispatch,
}: {
  selectedField: FormField;
  dispatch: ReturnType<typeof useAppDispatch>;
}) => (
  <Box>
    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
      Manage Options
    </Typography>
    <Stack spacing={1}>
      {selectedField.options?.map((option, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            value={option}
            onChange={(e) =>
              dispatch(
                updateOptionInField({
                  fieldId: selectedField.id,
                  optionIndex: index,
                  newText: e.target.value,
                })
              )
            }
            size="small"
            fullWidth
          />
          <IconButton
            size="small"
            onClick={() =>
              dispatch(
                removeOptionFromField({
                  fieldId: selectedField.id,
                  optionIndex: index,
                })
              )
            }
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          dispatch(addOptionToField({ fieldId: selectedField.id }))
        }
        sx={{ mt: 1 }}
      >
        Add Option
      </Button>
    </Stack>
  </Box>
);

// Component for editing validation rules
const ValidationsEditor = ({
  selectedField,
  dispatch,
}: {
  selectedField: FormField;
  dispatch: ReturnType<typeof useAppDispatch>;
}) => {
  const [selectedRule, setSelectedRule] = React.useState<
    ValidationRule["type"] | ""
  >("");

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Validations
      </Typography>
      <Stack spacing={2}>
        {selectedField.validations.map((rule, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {availableRules.find((r) => r.type === rule.type)?.label}
              </Typography>
              <IconButton
                size="small"
                onClick={() =>
                  dispatch(
                    removeValidationRule({
                      fieldId: selectedField.id,
                      ruleIndex: index,
                    })
                  )
                }
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Stack spacing={1.5}>
              {availableRules.find((r) => r.type === rule.type)?.valueType && (
                <TextField
                  label="Value"
                  type={
                    availableRules.find((r) => r.type === rule.type)
                      ?.valueType || "text"
                  }
                  value={rule.value || ""}
                  onChange={(e) =>
                    dispatch(
                      updateValidationRule({
                        fieldId: selectedField.id,
                        ruleIndex: index,
                        newRuleProps: { value: e.target.value },
                      })
                    )
                  }
                  size="small"
                />
              )}
              <TextField
                label="Error Message"
                value={rule.message || ""}
                onChange={(e) =>
                  dispatch(
                    updateValidationRule({
                      fieldId: selectedField.id,
                      ruleIndex: index,
                      newRuleProps: { message: e.target.value },
                    })
                  )
                }
                size="small"
              />
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Rule Type</InputLabel>
          <Select
            value={selectedRule}
            label="Rule Type"
            onChange={(e) =>
              setSelectedRule(e.target.value as ValidationRule["type"])
            }
          >
            {availableRules.map((r) => (
              <MenuItem key={r.type} value={r.type}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            if (selectedRule) {
              dispatch(
                addValidationRule({
                  fieldId: selectedField.id,
                  rule: { type: selectedRule, message: "" },
                })
              );
              setSelectedRule("");
            }
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

// Main component export
export const FieldConfigurationPanel = () => {
  const dispatch = useAppDispatch();
  const { fields, selectedFieldId } = useAppSelector(
    (state) => state.formBuilder
  );
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  if (!selectedField) {
    return (
      <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Configuration
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary">
          Select a field to configure its properties.
        </Typography>
      </Paper>
    );
  }

  const handleUpdate = (newProps: object) => {
    dispatch(updateField({ id: selectedField.id, newProps }));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, height: "100%", overflowY: "auto" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Configure: {selectedField.type}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        <TextField
          label="Label"
          value={selectedField.label}
          onChange={(e) => handleUpdate({ label: e.target.value })}
          fullWidth
        />
        <TextField
          label="Placeholder"
          value={selectedField.placeholder || ""}
          onChange={(e) => handleUpdate({ placeholder: e.target.value })}
          fullWidth
        />
        <TextField
          label="Default Value"
          value={selectedField.defaultValue || ""}
          onChange={(e) => handleUpdate({ defaultValue: e.target.value })}
          fullWidth
        />
        <FormControlLabel
          control={
            <Switch
              checked={selectedField.required}
              onChange={(e) => handleUpdate({ required: e.target.checked })}
            />
          }
          label="Required"
        />

        {(selectedField.type === "select" ||
          selectedField.type === "radio") && (
          <OptionsEditor selectedField={selectedField} dispatch={dispatch} />
        )}

        <Divider sx={{ pt: 1 }} />

        <ValidationsEditor selectedField={selectedField} dispatch={dispatch} />
      </Stack>
    </Paper>
  );
};
