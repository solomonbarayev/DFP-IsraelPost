import { createSlice } from "@reduxjs/toolkit";
import type { FormDataState } from "@/types/form-data.ts";
import getNestedObject from "@/utils/helper-functions/form-data-helpers/get-nested-object";

const initialState: FormDataState = {
  forms: {}, // Each form will be stored with its formId as the key
  currentFormId: null,
  isSendingEntry: false,
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setSendingEntry: (state, action) => {
      state.isSendingEntry = action.payload;
    },

    initializeForm: (state, action) => {
      const { formId, formNumber, initialData } = action.payload;
      state.forms[formId] = {
        formNumber: formNumber || null,
        data: initialData || {},
        isSubmitted: false,
        // documents: [],
        currentStep: 0, // Add current step tracking
        stepValidation: {}, // Store validation results per step
        numberOfSteps: 0,
      };
      state.currentFormId = formId;
    },

    updateField: (state, action) => {
      let { field, value, formId } = action.payload;
      const targetFormId = formId || state.currentFormId;

      // Initialize form if it doesn't exist - should however never be the case
      if (!state.forms[targetFormId]) {
        state.forms[targetFormId] = {
          data: {},
          isSubmitted: false,
          //   documents: [],
          currentStep: 0,
          stepValidation: {},
        };
      }

      // Handle regular nested fields (e.g., "user.name")
      const fieldParts: string[] = field.split(".");
      let current: Record<string, any> = state.forms[targetFormId].data;

      for (let i = 0; i < fieldParts.length - 1; i++) {
        if (!current[fieldParts[i]]) {
          current[fieldParts[i]] = {};
        }
        current = current[fieldParts[i]] as Record<string, any>;
      }

      current[fieldParts[fieldParts.length - 1]] = value;
    },

    handleAddDynamicArrayItem: (state, action) => {
      const { formId, item, arrayName, path } = action.payload;
      const targetFormId = formId || state.currentFormId;

      const targetObject = getNestedObject(state.forms[targetFormId].data, path);

      if (!targetObject[arrayName]) {
        targetObject[arrayName] = [];
      }

      // Strip any existing id before assigning a new one
      const { id, ...rest } = item || {};
      const newItem = {
        ...rest,
        id: crypto.randomUUID(),
      };

      targetObject[arrayName].push(newItem);
    },

    handleRemoveDynamicArrayItem: (state, action) => {
      const { formId, arrayName, path, index } = action.payload;
      const targetFormId = formId || state.currentFormId;

      const targetObject = getNestedObject(state.forms[targetFormId].data, path);

      if (targetObject && targetObject[arrayName]) {
        targetObject[arrayName].splice(index, 1);
      }
    },

    handleUpdateDynamicArrayField: (state, action) => {
      let { field, value, formId } = action.payload;
      const targetFormId = formId || state.currentFormId;

      // Split the field path into parts
      const parts = field.split(".");

      // The last three parts should be: arrayPath, id, fieldName
      // Everything before that is the path to the array
      const fieldName = parts.pop();
      const id = parts.pop();
      const arrayName = parts.pop();
      const pathToArray = parts;

      // Create a new data object
      const newData = { ...state.forms[targetFormId].data };
      let current = newData;

      // Navigate to the array's parent object
      for (const part of pathToArray) {
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }

      // Initialize array if it doesn't exist
      if (!current[arrayName]) {
        current[arrayName] = [];
      }

      // Find and update the item in the array
      const array = current[arrayName];
      const itemIndex = array.findIndex((item: { id: string }) => String(item.id) === String(id));

      if (itemIndex !== -1) {
        // Update existing item
        array[itemIndex] = { ...array[itemIndex], [fieldName]: value };
      } else {
        // Create new item if it doesn't exist
        array.push({ id, [fieldName]: value });
      }

      // Update the state
      state.forms[targetFormId].data = newData;
    },

    setFormSubmitted: (state, action) => {
      const { formId, isSubmitted } = action.payload;
      const targetFormId = formId || state.currentFormId;

      if (state.forms[targetFormId]) {
        state.forms[targetFormId].isSubmitted = isSubmitted;
      }
    },

    validateStep: (state, action) => {
      const { formId, step, validationResult } = action.payload;
      const targetFormId = formId || state.currentFormId;

      if (!state.forms[targetFormId]) {
        state.forms[targetFormId] = {
          data: {},
          isSubmitted: false,
          currentStep: 0,
          stepValidation: {},
        };
      }

      state.forms[targetFormId].stepValidation[step] = validationResult;
    },

    setCurrentStep: (state, action) => {
      const { formId, step } = action.payload;
      const targetFormId = formId || state.currentFormId;

      if (state.forms[targetFormId]) {
        state.forms[targetFormId].currentStep = step;
      }
    },

    setNumberOfSteps: (state, action) => {
      const { formId, steps } = action.payload;
      if (state.forms[formId]) {
        state.forms[formId].numberOfSteps = steps;
      }
    },

    updateFormNumber: (state, action) => {
      const { formId, formNumber } = action.payload;
      if (state.forms[formId]) {
        state.forms[formId].formNumber = formNumber;
      }
    },
  },
});

export const {
  setSendingEntry,
  initializeForm,
  updateField,
  handleAddDynamicArrayItem,
  handleRemoveDynamicArrayItem,
  handleUpdateDynamicArrayField,
  setFormSubmitted,
  validateStep,
  setCurrentStep,
  setNumberOfSteps,
  updateFormNumber,
} = formDataSlice.actions;

export default formDataSlice.reducer;
