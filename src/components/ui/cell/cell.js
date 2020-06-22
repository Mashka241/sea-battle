import React from 'react'
import classes from './cell.module.scss'

const Cell = ({ type, cellClickHandler }) => {
  // const cellMouseOverHandler = (evt) => {
  //   console.log(evt.currentTarget)
  //   evt.currentTarget.style.background = 'green'
  // }

  return (
    <div className={classes.Cell} onClick={cellClickHandler}>{type}</div>
  )
}

export default Cell
