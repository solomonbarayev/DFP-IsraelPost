import { configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import constantsSliceReducer from './slices/constants.slice'
import formDataSliceReducer from './slices/form-data.slice'
import formDocumentsSliceReducer from './slices/form-documents.slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    constants: constantsSliceReducer,
    formData: formDataSliceReducer,
    formDocuments: formDocumentsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

