import * as React from 'react'
import { memo } from 'react'
import css from './Checkbox.module.css'

interface Params {
  checked: boolean, 
  index: number, 
  toggle: (index: number) => void
}

const Checkbox = memo(({ checked, index, toggle }: Params) => {
  return (
    <label>
      <input type="checkbox" checked={checked || false} className={css.invisible} onChange={() => toggle(index)}/>
      <div className={css.customCheckbox}/>
    </label>
  )
})

export default Checkbox