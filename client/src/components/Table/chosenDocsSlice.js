import { createSlice } from "@reduxjs/toolkit";

export const chosenDocsSlice = createSlice({
  name: 'chosenDocs',
  initialState: [],
  reducers: {
    setChosenDocs: (state, action) => action.payload
  }
})

export const { setChosenDocs } = chosenDocsSlice.actions

export default chosenDocsSlice.reducer;

export const selectChosenDocs = state => state.chosenDocs