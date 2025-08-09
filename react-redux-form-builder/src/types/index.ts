export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export interface ValidationRule {
  type: "notEmpty" | "minLength" | "maxLength" | "isEmail" | "customPassword";
  value?: string | number;
  message: string;
}

export interface DerivedFieldLogic {
  parentFieldIds: string[];
  computation: "ageFromDate";
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  placeholder?: string;
  options?: string[];
  validations: ValidationRule[];
  isDerived: boolean;
  derivedLogic?: DerivedFieldLogic;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}
