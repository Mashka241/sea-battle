import React from 'react'
import clsx from 'clsx'
import classes from './cell.module.scss'

const Cell = ({ type, cellClickHandler }) => {
  // const cellMouseOverHandler = (evt) => {
  //   console.log(evt.currentTarget)
  //   evt.currentTarget.style.background = 'green'
  // }

  let className = ''
  switch (type) {
    case 1:
      className = classes.CellShip
      break
    default: className = ''
  }

  return (
    <div className={clsx(classes.Cell, className)} onClick={cellClickHandler}>{type}</div>
  )
}

export default Cell
