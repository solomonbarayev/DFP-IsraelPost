import { createSlice } from "@reduxjs/toolkit";
import type { FormDocumentsState } from "@/types/forms-documents.ts";
import dayjs from "dayjs";

const initialState: FormDocumentsState = {
  forms: {},
};

const formDocumentSlice = createSlice({
  name: "formDocuments",
  initialState,
  reducers: {
    addDocument: (state, action) => {
      const { document, formId } = action.payload;

      if (state.forms[formId]) {
        state.forms[formId].documents.push({
          documentId: crypto.randomUUID(),
          documentTitle: document.documentTitle,
          documentName: document.documentName,
          documentType: document.documentName.split(".").pop(),
          uploadDate: dayjs().format("YYYY-MM-DD"),
          documentBase64: document.documentBase64,
          documentCategory: document.documentCategory || "",
        });
      }
    },

    removeDocumentById: (state, action) => {
      const { documentId, formId } = action.payload;

      if (state.forms[formId]) {
        state.forms[formId].documents = state.forms[formId].documents.filter((document) => document.documentId !== documentId);
      }
    },

    addDocumentToCategory: (state, action) => {
      const { document, category, formId } = action.payload;

      if (state.forms[formId]) {
        state.forms[formId].documents.push({
          documentId: document.documentId || crypto.randomUUID(),
          documentTitle: document.documentTitle,
          documentName: document.documentName,
          documentType: document.documentName?.split(".").pop() || "",
          uploadDate: dayjs().format("YYYY-MM-DD"),
          documentBase64: document.documentBase64,
          documentCategory: category,
          itemId: document.itemId || null, // Support grouping documents by item
        });
      }
    },

    removeDocumentFromCategory: (state, action) => {
      const { documentId, category, formId } = action.payload;

      if (state.forms[formId]) {
        state.forms[formId].documents = state.forms[formId].documents.filter(
          (document) => !(document.documentId === documentId && document.documentCategory === category)
        );
      }
    },

    updateDocumentInCategory: (state, action) => {
      const { document, category, formId } = action.payload;

      if (state.forms[formId]) {
        const documentIndex = state.forms[formId].documents.findIndex(
          (doc) => doc.documentId === document.documentId && doc.documentCategory === category
        );

        if (documentIndex !== -1) {
          // Update existing document in place
          state.forms[formId].documents[documentIndex] = {
            ...state.forms[formId].documents[documentIndex],
            documentName: document.documentName,
            documentType: document.documentName?.split(".").pop() || "",
            uploadDate: dayjs().format("YYYY-MM-DD"),
            documentBase64: document.documentBase64,
          };
        }
      }
    },

    clearDocumentFileData: (state, action) => {
      const { documentId, category, formId } = action.payload;

      if (state.forms[formId]) {
        const documentIndex = state.forms[formId].documents.findIndex(
          (doc) => doc.documentId === documentId && doc.documentCategory === category
        );

        if (documentIndex !== -1) {
          // Clear file data while keeping document structure
          state.forms[formId].documents[documentIndex] = {
            ...state.forms[formId].documents[documentIndex],
            documentName: "",
            documentType: "",
            uploadDate: "",
            documentBase64: "",
          };
        }
      }
    },

    clearDocuments: (state, action) => {
      const { formId } = action.payload;

      if (state.forms[formId]) {
        state.forms[formId].documents = [];
      }
    },
  },
});

export const {
  addDocument,
  removeDocumentById,
  addDocumentToCategory,
  removeDocumentFromCategory,
  updateDocumentInCategory,
  clearDocumentFileData,
  clearDocuments,
} = formDocumentSlice.actions;

export default formDocumentSlice.reducer;