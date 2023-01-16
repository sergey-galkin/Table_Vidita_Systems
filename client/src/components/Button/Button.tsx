import * as React from 'react'
import { memo } from 'react'
import css from './Button.module.css'

interface Params {
  classesArr?: string[]; 
  [key: string]: any;
};

const Button = memo(({classesArr = [], ...props}: Params) => {
  return (
    <button type='button' className={[css.btn, ...classesArr].join(' ')} {...props} />
  )
})

export default Button