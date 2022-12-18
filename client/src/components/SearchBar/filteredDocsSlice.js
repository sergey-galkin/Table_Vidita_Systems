import { createSlice } from "@reduxjs/toolkit";

export const filteredDocsSlice = createSlice({
  name: 'filteredDocs',
  initialState: [],
  reducers: {
    setFilteredDocs: (state, action) => action.payload
  }
})

export const { setFilteredDocs } = filteredDocsSlice.actions

export default filteredDocsSlice.reducer;

export const selectFilteredDocs = state => state.filteredDocs