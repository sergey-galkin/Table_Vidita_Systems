import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDocs, selectDocsEntities } from '../../api/apiSlice';
import { setFilteredDocs } from './filteredDocsSlice';
import css from './SearchBar.module.css'

function generateSearchData(docsArr) {
  const uniqueValues = docsArr.reduce((res, doc) => {
    for (const key in doc) {
      if (Object.hasOwnProperty.call(doc, key)) {
        if (key === 'id') continue;
        if (!res[key]) res[key] = [{value: doc[key], ids: []}];
        
        const [uniqueDataObj] = res[key].filter(v => v.value === doc[key]);
        if (!uniqueDataObj) res[key].push({value: doc[key], ids: [doc.id]});
        else uniqueDataObj.ids.push(doc.id)
      }
    }
    return res;
  }, {})
  
  // sorting
  for (const key in uniqueValues) {
    if (Object.hasOwnProperty.call(uniqueValues, key)) {
      const arr = uniqueValues[key];
      arr.sort((a, b) => {
        if (typeof a.value === 'number') return a.value - b.value;
        else return a.value.localeCompare(b.value)
      })
    }
  }

  return uniqueValues
}

function generateTotalCosts(docsArr) {
  const totalCosts = docsArr
    .map(doc => ({id: doc.id, total: doc.sum * doc.qty, currency: doc.currency}))
    .sort((a, b) => a.total - b.total)
  ;

  const uniqueCosts = totalCosts.reduce((res, obj) => {
    const value = obj.total.toLocaleString() + ' ' + obj.currency;
    const [uniqueDataObj] = res.filter(v => v.value === value);
    
    if (!uniqueDataObj) res.push({value: value, ids: [obj.id]});
    else uniqueDataObj.ids.push(obj.id)

    return res;
  }, [])

  return uniqueCosts;
}

const SearchBar = memo(({ headers }) => {
  const searchHeaders = [...headers, {key: 'total', value: 'Всего'}];
  const docsArr = useSelector(selectAllDocs);
  const docsObj = useSelector(selectDocsEntities);
  const [filters, setFilters] = useState(() => searchHeaders.map(() => []));
  const dispatch = useDispatch();

  const searchData = generateSearchData(docsArr);
  searchData.total = generateTotalCosts(docsArr);

  const handleFilter = useCallback((event,  index) => {
    setFilters(p => {
      const newFilters = [...p];
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

    let filteredDocs = enabledFilters[0].map(id => docsObj[id]);
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