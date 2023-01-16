import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Doc } from "../../api/apiSlice";
import type { RootState } from "../../app/store";

const initialState: Doc[] = [];

export const chosenDocsSlice = createSlice({
  name: 'chosenDocs',
  initialState,
  reducers: {
    setChosenDocs: (state, action: PayloadAction<Doc[]>) => action.payload
  }
})

export const { setChosenDocs } = chosenDocsSlice.actions

export default chosenDocsSlice.reducer;

export const selectChosenDocs = (state: RootState) => state.chosenDocs