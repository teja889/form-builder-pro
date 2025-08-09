import { useParams } from "react-router-dom";
import {
  useForm,
  Controller,
  type Resolver,
  type FieldErrors,
} from "react-hook-form";
import { useAppSelector } from "../app/hooks";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import type { FormField, ValidationRule } from "../types";

// Helper function to validate a single value against rules
const validateValue = (value: any, rules: ValidationRule[]) => {
  for (const rule of rules) {
    switch (rule.type) {
      case "notEmpty":
        if (!value) return rule.message;
        break;
      case "minLength":
        if (String(value).length < Number(rule.value)) return rule.message;
        break;
      case "maxLength":
        if (String(value).length > Number(rule.value)) return rule.message;
        break;
      case "isEmail":
        if (!/\S+@\S+\.\S+/.test(String(value))) return rule.message;
        break;
      case "customPassword":
        if (String(value).length < 8 || !/\d/.test(String(value)))
          return rule.message;
        break;
    }
  }
  return true; // No errors
};

export const PreviewFormPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const formSchema = useAppSelector((state) =>
    state.forms.forms.find((form) => form.id === formId)
  );

  // Custom resolver for react-hook-form to handle our dynamic validation rules
  const formResolver: Resolver = (data) => {
    const errors: FieldErrors = {};
    formSchema?.fields.forEach((field) => {
      const value = data[field.id];
      const validationResult = validateValue(value, field.validations);
      if (validationResult !== true) {
        errors[field.id] = {
          type: "manual",
          message: validationResult,
        };
      }
    });
    return {
      values: data,
      errors,
    };
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: formResolver });

  const onSubmit = (data: any) => {
    const fieldIdToLabelMap = new Map(
      formSchema!.fields.map((field) => [field.id, field.label])
    );
    const formattedData = Object.keys(data).reduce((acc, fieldId) => {
      const label = fieldIdToLabelMap.get(fieldId) || fieldId;
      const key = label.toLowerCase().replace(/\s+/g, "_");
      acc[key] = data[fieldId];
      return acc;
    }, {} as Record<string, any>);
    alert("Form submitted! Check the console for the formatted data.");
    console.log("Formatted Form Data:", formattedData);
  };

  if (!formSchema) {
    return (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" color="error">
          Form Not Found
        </Typography>
      </Paper>
    );
  }

  const renderField = (field: FormField) => {
    const getSafeDefaultValue = () => {
      if (field.type === "number" && isNaN(parseFloat(field.defaultValue)))
        return "";
      if (field.type === "checkbox") return field.defaultValue || false;
      return field.defaultValue || "";
    };

    return (
      <Controller
        name={field.id}
        control={control}
        defaultValue={getSafeDefaultValue()}
        render={({ field: controllerField }) => {
          const error = errors[field.id];
          switch (field.type) {
            case "text":
            case "number":
            case "date":
              return (
                <TextField
                  {...controllerField}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  fullWidth
                  error={!!error}
                  helperText={error ? String(error.message || "") : null}
                  InputLabelProps={
                    field.type === "date" ? { shrink: true } : {}
                  }
                />
              );
            case "textarea":
              return (
                <TextField
                  {...controllerField}
                  label={field.label}
                  placeholder={field.placeholder}
                  fullWidth
                  multiline
                  rows={4}
                  error={!!error}
                  helperText={error ? String(error.message || "") : null}
                />
              );
            case "checkbox":
              return (
                <FormControl error={!!error}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...controllerField}
                        checked={!!controllerField.value}
                      />
                    }
                    label={field.label}
                  />
                  {error && (
                    <FormHelperText>
                      {String(error.message || "")}
                    </FormHelperText>
                  )}
                </FormControl>
              );
            case "select":
              return (
                <FormControl fullWidth error={!!error}>
                  <FormLabel>{field.label}</FormLabel>
                  <Select {...controllerField}>
                    {field.options?.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && (
                    <FormHelperText>
                      {String(error.message || "")}
                    </FormHelperText>
                  )}
                </FormControl>
              );
            case "radio":
              return (
                <FormControl component="fieldset" error={!!error}>
                  <FormLabel component="legend">{field.label}</FormLabel>
                  <RadioGroup {...controllerField}>
                    {field.options?.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                  {error && (
                    <FormHelperText>
                      {String(error.message || "")}
                    </FormHelperText>
                  )}
                </FormControl>
              );
            default:
              return <></>;
          }
        }}
      />
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        {formSchema.name}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {formSchema.fields.map((field) => (
            <Box key={field.id}>{renderField(field)}</Box>
          ))}
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
