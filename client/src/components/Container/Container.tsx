import * as React from 'react'
import css from './Container.module.css'

const Container = (props: {[key: string]: any}) => {
  return (
    <div className={css.container} {...props} />
  )
}

export default Container