import React, { memo } from 'react'
import css from './Checkbox.module.css'

const Checkbox = memo(({ checked, index, toggle }) => {
  return (
    <label>
      <input type="checkbox" checked={checked || false} className={css.invisible} onChange={() => toggle(index)}/>
      <div className={css.customCheckbox}/>
    </label>
  )
})

export default Checkbox