import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormField, FieldType, ValidationRule } from "../../types"; // Import ValidationRule
import { v4 as uuidv4 } from "uuid";

// ... (Interface and Initial State are the same)
interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
}

const initialState: FormBuilderState = {
  fields: [],
  selectedFieldId: null,
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    // --- No changes to existing reducers ---
    addField: (state, action: PayloadAction<{ type: FieldType }>) => {
      const newField: FormField = {
        id: uuidv4(),
        type: action.payload.type,
        label: `New ${action.payload.type} field`,
        required: false,
        options:
          action.payload.type === "select" || action.payload.type === "radio"
            ? []
            : undefined,
        validations: [],
        isDerived: false,
        placeholder: `Enter ${action.payload.type}...`,
      };
      state.fields.push(newField);
      state.selectedFieldId = newField.id;
    },
    removeField: (state, action: PayloadAction<{ id: string }>) => {
      state.fields = state.fields.filter((f) => f.id !== action.payload.id);
      state.selectedFieldId = null;
    },
    setSelectedField: (state, action: PayloadAction<{ id: string | null }>) => {
      state.selectedFieldId = action.payload.id;
    },
    updateField: (
      state,
      action: PayloadAction<{ id: string; newProps: Partial<FormField> }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.id);
      if (field) {
        Object.assign(field, action.payload.newProps);
      }
    },
    addOptionToField: (state, action: PayloadAction<{ fieldId: string }>) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field && field.options) {
        field.options.push(`Option ${field.options.length + 1}`);
      }
    },
    removeOptionFromField: (
      state,
      action: PayloadAction<{ fieldId: string; optionIndex: number }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field && field.options) {
        field.options.splice(action.payload.optionIndex, 1);
      }
    },
    updateOptionInField: (
      state,
      action: PayloadAction<{
        fieldId: string;
        optionIndex: number;
        newText: string;
      }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field && field.options) {
        field.options[action.payload.optionIndex] = action.payload.newText;
      }
    },
    resetBuilder: (state) => {
      state.fields = [];
      state.selectedFieldId = null;
    },
    reorderFields: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const [removed] = state.fields.splice(action.payload.startIndex, 1);
      state.fields.splice(action.payload.endIndex, 0, removed);
    },

    // --- NEW ACTIONS FOR VALIDATIONS ---
    addValidationRule: (
      state,
      action: PayloadAction<{ fieldId: string; rule: ValidationRule }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field) {
        field.validations.push(action.payload.rule);
      }
    },
    removeValidationRule: (
      state,
      action: PayloadAction<{ fieldId: string; ruleIndex: number }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field) {
        field.validations.splice(action.payload.ruleIndex, 1);
      }
    },
    updateValidationRule: (
      state,
      action: PayloadAction<{
        fieldId: string;
        ruleIndex: number;
        newRuleProps: Partial<ValidationRule>;
      }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field) {
        const rule = field.validations[action.payload.ruleIndex];
        if (rule) {
          Object.assign(rule, action.payload.newRuleProps);
        }
      }
    },
  },
});

export const {
  addField,
  removeField,
  setSelectedField,
  updateField,
  resetBuilder,
  addOptionToField,
  removeOptionFromField,
  updateOptionInField,
  // Export the new actions
  addValidationRule,
  removeValidationRule,
  updateValidationRule,
} = formBuilderSlice.actions;

export const { reorderFields } = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
