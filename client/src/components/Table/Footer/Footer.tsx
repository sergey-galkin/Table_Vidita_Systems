import * as React from 'react'
import { memo } from 'react'
import css from './Footer.module.css'
import type { Doc } from '../../../api/apiSlice';

interface Params {
  docs: Doc[];
  colSpan: number;
}

const Footer = memo(({docs, colSpan}: Params) => {
  return (
    <tfoot className={css.footer}>
      <tr>
        <th></th>
        <th>Общий объём:</th>
        <td colSpan={colSpan}>{docs.reduce((res: number, doc) => res + doc.volume, 0)}</td>
      </tr>
      <tr>
        <th></th>
        <th>Общее количество:</th>
        <td colSpan={colSpan}>{docs.reduce((res: number, doc) => res + doc.qty, 0)}</td>
      </tr>
    </tfoot>
  )
})

export default Footer