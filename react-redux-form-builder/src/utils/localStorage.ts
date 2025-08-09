import type { FormSchema } from "../types";

const STORAGE_KEY = "savedForms";

export const loadFormsFromStorage = (): FormSchema[] => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load forms from localStorage", error);
    return [];
  }
};

export const saveFormsToStorage = (forms: FormSchema[]): void => {
  try {
    const serializedState = JSON.stringify(forms);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Could not save forms to localStorage", error);
  }
};
