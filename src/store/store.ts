import { configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import constantsSliceReducer from './slices/constants.slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    constants: constantsSliceReducer,
    // formData: formDataSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

