import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Doc } from '../../api/apiSlice'
import type { RootState } from "../../app/store";

const initialState: Doc[] = [];

export const filteredDocsSlice = createSlice({
  name: 'filteredDocs',
  initialState,
  reducers: {
    setFilteredDocs: (state, action: PayloadAction<Doc[]>) => action.payload
  }
})

export const { setFilteredDocs } = filteredDocsSlice.actions

export default filteredDocsSlice.reducer;

export const selectFilteredDocs = (state: RootState) => state.filteredDocs