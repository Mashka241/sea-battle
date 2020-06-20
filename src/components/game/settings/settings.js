import React, { useState } from 'react'
import Field from '../../ui/field/field'
import Cell from '../../ui/cell/cell'
import classes from './settings.module.scss'

const Settings = () => {
  const [ships, setShips] = useState([
    { size: 4, number: 1 },
    { size: 3, number: 2 },
    { size: 2, number: 3 },
    { size: 1, number: 4 }
  ])

  const renderShip = (number) => {
    const shipArr = []
    for (let i = 0; i < number; i++) {
      shipArr.push(<Cell key={`settings-ship-cell${number}-${i}`} type={0} />)
    }
    return shipArr
  }

  return (
    <div className={classes.Settings}>
      <Field />

      <div className={classes.Description}>
        <p>You can place you ships <button>randomly</button></p>
        <p>or drag and drop them on the playfield. To place ship vertically click on it with right mouse button</p>

        <ul className={classes.ShipsList}>
          {ships.map(ship => {
            return (
              <li key={`settings-ship-${ship.size}`} className={classes.ShipsListItem}>
                <span className={classes.ShipNumber}>{ship.number}x </span>
                <div className={classes.Ship}>
                  {renderShip(ship.size)}
                </div>
              </li>
            )
          })}
        </ul>
        <p>Don't place ships like this:</p>
      </div>
    </div>
  )
}

export default Settings
