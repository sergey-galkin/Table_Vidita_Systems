import React, { memo } from 'react'
import css from './Button.module.css'

const Button = memo(({classesArr=[], ...props}) => {
  return (
    <button type='button' className={[css.btn, ...classesArr].join(' ')} {...props} />
  )
})

export default Button