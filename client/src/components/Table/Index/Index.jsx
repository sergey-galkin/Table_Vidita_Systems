import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilteredDocs } from '../../SearchBar/filteredDocsSlice';
import Checkbox from '../Checkbox/Checkbox';
import { setChosenDocs } from '../chosenDocsSlice';
import Footer from '../Footer/Footer';
import css from './Index.module.css'

const Table = ({ headers }) => {
  const filteredDocs = useSelector(selectFilteredDocs);
  const [checkboxes, setCheckboxes] = useState(() => filteredDocs.map(() => false))
  const [groupCheckbox, setGroupCheckbox] = useState(false)
  const dispatch = useDispatch();

  const areAllCheckboxesChecked = useCallback(() => {
    if (!checkboxes.length) return false;
    else return checkboxes.reduce((res, checkbox) => res ? checkbox : res, true)}
  , [checkboxes]);

  useEffect(() => {
    if (areAllCheckboxesChecked()) {
      setGroupCheckbox(true);
    } else {
      setGroupCheckbox(false);
    }
    dispatch(setChosenDocs(filteredDocs.filter((doc, i) => checkboxes[i])))
  }, [checkboxes])

  useEffect(() => {
    if (groupCheckbox) {
      setCheckboxes(filteredDocs.map(() => true));
    } else if (areAllCheckboxesChecked()) {
      setCheckboxes(filteredDocs.map(() => false));
    }
  }, [groupCheckbox])

  useEffect(() => {
    setCheckboxes(filteredDocs.map(() => false));
  }, [filteredDocs])
  
  const toggleCheckbox = useCallback((i) => {
    setCheckboxes(p => {
      const clone = [...p];
      clone[i] = !clone[i]
      return clone
    })
  }, [])
  
  const toggleGroupCheckbox = useCallback(() => {
    setGroupCheckbox(p => !p)
  }, [])

  return (
    <table>
      <thead className={css.head}>
        <tr>
          <th>№</th>
          {headers.map(h => <th key={h.value}>{h.value}</th>)}
          <th>Всего</th>
          <th><Checkbox checked={groupCheckbox} toggle={toggleGroupCheckbox}/></th>
        </tr>
      </thead>
      <tbody className={css.body}>
        {filteredDocs.map((doc, i) => 
          <tr key={doc.id} className={i % 2 ? '' : css.oddRow} >
            <td className={css.rightAlign}>{i + 1}</td>
            {headers.map(h => 
              <td key={h.key}>
                {h.key === 'sum' ? doc[h.key].toLocaleString() : doc[h.key]}
              </td>
            )}
            <td className={css.rightAlign}>{(doc.sum * doc.qty).toLocaleString() + ' ' + doc.currency}</td>
            <td><Checkbox checked={checkboxes[i]} index={i} toggle={toggleCheckbox}/></td>
          </tr>
        )}
      </tbody>
      <Footer docs={filteredDocs} colSpan={headers.length + 1} />
    </table>
  )
}

export default Table