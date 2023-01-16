import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { selectAllDocs, selectDocsEntities } from '../../api/apiSlice';
import { setFilteredDocs } from './filteredDocsSlice';
import css from './SearchBar.module.css';
import { TableHeaders } from '../../App'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Doc } from '../../api/apiSlice';

function generateSearchData(docsArr: Doc[]) {
  interface SearchData {
    [key: string]: {
      value: string | number;
      ids: string[];
    }[]
  }

  const res: SearchData = {};

  const uniqueValues = docsArr.reduce((res, doc) => {
    let key: keyof Doc;
    for (key in doc) {
      if (Object.hasOwnProperty.call(doc, key)) {
        if (key === 'id') continue;
        if (res[key] === undefined) res[key] = [{value: doc[key], ids: []}];
        
        const [uniqueDataObj] = res[key].filter(v => v.value === doc[key]);
        if (!uniqueDataObj) res[key].push({value: doc[key], ids: [doc.id]});
        else uniqueDataObj.ids.push(doc.id)
      }
    }
    return res;
  }, res)
  
  // sorting
  for (const key in uniqueValues) {
    if (Object.hasOwnProperty.call(uniqueValues, key)) {
      const arr = uniqueValues[key];
      arr.sort((a, b) => {
        if (typeof a.value === 'number' && typeof b.value === 'number') return a.value - b.value;
        if (typeof a.value === 'string' && typeof b.value === 'string') return a.value.localeCompare(b.value);
        return 0;
      })
    }
  }

  return uniqueValues
}

function generateTotalCosts(docsArr: Doc[]) {
  const totalCosts = docsArr
    .map(doc => ({id: doc.id, total: doc.sum * doc.qty, currency: doc.currency}))
    .sort((a, b) => a.total - b.total)
  ;

  type CostsArr = {
    value: string;
    ids: string[];
  }[]

  const res: CostsArr = [];

  const uniqueCosts = totalCosts.reduce((res, obj) => {
    const value = obj.total.toLocaleString() + ' ' + obj.currency;
    const [uniqueDataObj] = res.filter(v => v.value === value);
    
    if (!uniqueDataObj) res.push({value: value, ids: [obj.id]});
    else uniqueDataObj.ids.push(obj.id)

    return res;
  }, res)

  return uniqueCosts;
}

const SearchBar = memo(({ headers }: {headers: TableHeaders}) => {
  const searchHeaders = [...headers, {key: 'total', value: 'Всего'}];
  const docsArr = useAppSelector(selectAllDocs);
  const docsObj = useAppSelector(selectDocsEntities);
  const [filters, setFilters] = useState((): string[][] => searchHeaders.map(() => []));
  const dispatch = useAppDispatch();

  const searchData = generateSearchData(docsArr);
  searchData.total = generateTotalCosts(docsArr);

  const handleFilter = useCallback((event: React.ChangeEvent<HTMLSelectElement>,  index: number) => {
    setFilters(p => {
      const newFilters = [...p];
      if (event.target === null) return newFilters;

      const valuesArr = event.target.value.split(', ')
      
      if (valuesArr[0] === '') newFilters[index] = [];
      else newFilters[index] = valuesArr;

      return newFilters;
    })
  }, [])

  useEffect(() => {
    const enabledFilters = filters.filter(f => f.length)
    if (!enabledFilters.length) {
      dispatch(setFilteredDocs(docsArr))
      return;
    }

    let filteredDocs = enabledFilters[0].map(id => docsObj[id]) as Doc[];
    for (let i = 0; i < enabledFilters.length; i++) {
      filteredDocs = filteredDocs.filter(doc => enabledFilters[i].includes(doc.id))
      if (!filteredDocs.length) break;
    }
    dispatch(setFilteredDocs(filteredDocs))
    
  }, [filters])

  return (
    <aside className={css.searchBar}>
      <h2>ПОИСК</h2>
      {searchHeaders.map((h, i) => 
        <div key={h.value} className={css.block}>
          <div>{h.value + ':'}</div>
          <select onChange={event => handleFilter(event, i)}>
            <option value=""></option>
            {searchData[h.key].map(obj => 
              <option key={obj.value} value={obj.ids.join(', ')} className={
                (typeof obj.value === 'number' || h.key === 'total') ? css.rightAlign : ''}
              >
                {h.key === 'sum' ? obj.value.toLocaleString() : obj.value}
              </option>
            )}
          </select>
        </div>
      )}
    </aside>
  )
})

export default SearchBar