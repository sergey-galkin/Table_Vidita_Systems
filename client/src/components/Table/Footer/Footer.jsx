import React, { memo } from 'react'
import css from './Footer.module.css'

const Footer = memo(({docs, colSpan}) => {
  return (
    <tfoot className={css.footer}>
      <tr>
        <th></th>
        <th>Общий объём:</th>
        <td colSpan={colSpan}>{docs.reduce((res, doc) => res + doc.volume, 0)}</td>
      </tr>
      <tr>
        <th></th>
        <th>Общее количество:</th>
        <td colSpan={colSpan}>{docs.reduce((res, doc) => res + doc.qty, 0)}</td>
      </tr>
    </tfoot>
  )
})

export default Footer