import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const defaultSort = (a, b) => a.delivery_date.localeCompare(b.delivery_date);

const docsAdapter = createEntityAdapter({
  sortComparer: defaultSort,
});

const initialState = docsAdapter.getInitialState();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: builder => ({
    getDocs1: builder.query({
      query: () => '/documents1',
      transformResponse: res => {
        return docsAdapter.setAll(initialState, res)
      },
    }),
    getDocs2: builder.query({
      query: () => '/documents2',
      transformResponse: res => {
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
const selectDocs1 = apiSlice.endpoints.getDocs1.select();
const selectDocs1Data = createSelector(
  selectDocs1,
  res => res.data
)

// selectors for "/documents2"
const selectDocs2 = apiSlice.endpoints.getDocs2.select();
const selectDocs2Data = createSelector(
  selectDocs2,
  res => res.data
)

// selectors for all documents
const selectDocsData = createSelector(
  selectDocs1Data,
  selectDocs2Data,
  (docs1, docs2) => {
    const allDocs = {
      ids: [...docs1.ids, ...docs2.ids],
      entities: {...docs1.entities, ...docs2.entities}
    }

    allDocs.ids = allDocs.ids
      .map(id => allDocs.entities[id])
      .sort(defaultSort)
      .map(doc => doc.id)
    ;

    return allDocs;
  }
)

export const {
  selectAll: selectAllDocs,
  selectIds: selectDocsIds,
  selectEntities: selectDocsEntities,
} = docsAdapter.getSelectors(state => selectDocsData(state) ?? initialState)