import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import chosenDocsSlice from '../components/Table/chosenDocsSlice';
import filteredDocsSlice from '../components/SearchBar/filteredDocsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chosenDocs: chosenDocsSlice,
    filteredDocs: filteredDocsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
  ,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
