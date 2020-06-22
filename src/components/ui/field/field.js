import React, { useState } from 'react'
import Cell from '../cell/cell'
import classes from './field.module.scss'

const Field = ({ field }) => {
  // const cellClickHandler = (i, j) => {
  //   const newField = []

  //   for (let i = 0; i < field.length; i++) {
  //     newField.push([...field[i]])
  //   }
  //   newField[i][j] = 1
  //   setField(newField)
  // }

  return (
    <div className={classes.Field}>
      {field.map((row, i) => {
        return row.map((cell, j) => {
          return <Cell type={cell} key={`${i}-${j}`} />
        })
      })}
    </div>
  )
}

export default Field
