import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../app/store'

export interface Doc {
  id: string,
  status: 'active' | 'archive',
  sum: number,
  qty: number,
  volume: number,
  name: string,
  delivery_date: string,
  currency: string,
}

const defaultSort = (a: Doc, b: Doc) => a.delivery_date.localeCompare(b.delivery_date);

const docsAdapter = createEntityAdapter<Doc>({
  sortComparer: defaultSort,
});

const initialState = docsAdapter.getInitialState();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: builder => ({
    getDocs1: builder.query({
      query: () => '/documents1',
      transformResponse: (res: Doc[]) => {
        return docsAdapter.setAll(initialState, res)
      },
    }),
    getDocs2: builder.query({
      query: () => '/documents2',
      transformResponse: (res: Doc[]) => {
        return docsAdapter.setAll(initialState, res)
      },
    }),
  })
})

export const {
  useGetDocs1Query,
  useGetDocs2Query
} = apiSlice

// selectors for "/documents1"
const selectDocs1 = apiSlice.endpoints.getDocs1.select(null);
const selectDocs1Data = createSelector(
  selectDocs1,
  res => res.data
)

// selectors for "/documents2"
const selectDocs2 = apiSlice.endpoints.getDocs2.select(null);
const selectDocs2Data = createSelector(
  selectDocs2,
  res => res.data
)

// selectors for all documents
const selectDocsData = createSelector(
  selectDocs1Data,
  selectDocs2Data,
  (docs1, docs2) => {
    if (docs1 === undefined) docs1 = initialState;
    if (docs2 === undefined) docs2 = initialState;

    const allDocs = {
      ids: [...docs1.ids, ...docs2.ids],
      entities: {...docs1.entities, ...docs2.entities}
    }

    allDocs.ids = allDocs.ids
      .map(id => allDocs.entities[id])
      .sort(defaultSort)
      .map(doc => doc !== undefined ? doc.id : '')
    ;

    return allDocs;
  }
)

export const {
  selectAll: selectAllDocs,
  selectIds: selectDocsIds,
  selectEntities: selectDocsEntities,
} = docsAdapter.getSelectors((state: RootState) => selectDocsData(state) ?? initialState)