import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import chosenDocsSlice from '../components/Table/chosenDocsSlice';
import filteredDocsSlice from '../components/SearchBar/filteredDocsSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chosenDocs: chosenDocsSlice,
    filteredDocs: filteredDocsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
  ,
});
