import React from 'react'
import css from './Container.module.css'

const Container = (props) => {
  return (
    <div className={css.container} {...props} />
  )
}

export default Container