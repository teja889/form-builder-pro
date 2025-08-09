import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormSchema } from "../../types";
import {
  loadFormsFromStorage,
  saveFormsToStorage,
} from "../../utils/localStorage";

interface FormsState {
  forms: FormSchema[];
}

// Initialize state by loading from localStorage
const initialState: FormsState = {
  forms: loadFormsFromStorage(),
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormSchema>) => {
      state.forms.push(action.payload);
      // Persist to localStorage after adding
      saveFormsToStorage(state.forms);
    },
    // We can add deleteForm, updateForm reducers here later
  },
});

export const { addForm } = formsSlice.actions;
export default formsSlice.reducer;
