import React from 'react'
import classes from './cell.module.scss'

const Cell = ({ type, cellClickHandler }) => {
  return (
    <div className={classes.Cell} onClick={cellClickHandler}>{type}</div>
  )
}

export default Cell
