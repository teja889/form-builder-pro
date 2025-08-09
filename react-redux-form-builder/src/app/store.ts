import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "../features/savedForms/formSlice";
import formBuilderReducer from "../features/formBuilder/formBuilderSlice";

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    formBuilder: formBuilderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
