import React, { useState, useRef, useEffect } from 'react'
import Field from '../../ui/field/field'
import Cell from '../../ui/cell/cell'
import clsx from 'clsx'
import classes from './settings.module.scss'

const Settings = () => {
  const [ships, setShips] = useState([
    { size: 4, number: 1 },
    { size: 3, number: 2 },
    { size: 2, number: 3 },
    { size: 1, number: 4 }
  ])

  const movedShipEl = useRef(null)
  const [movedShipSize, setMovedShipSize] = useState(null)

  const [shift, _setShift] = useState({
    x: 0,
    y: 0
  })

  const shiftRef = useRef(shift)
  // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559

  const setShift = (x, y) => {
    shiftRef.current = {
      x,
      y
    }
    _setShift({
      x,
      y
    })
  }

  const renderShip = (number) => {
    const shipArr = []
    for (let i = 0; i < number; i++) {
      shipArr.push(<Cell key={`settings-ship-cell${number}-${i}`} type={0} />)
    }
    return shipArr
  }

  const documentMouseMoveHandler = (evt) => {
    movedShipEl.current.style.transform = `translate(${evt.pageX - shiftRef.current.x}px, ${evt.pageY - shiftRef.current.y}px)`
  }

  const shipMouseUpHandler = (evt) => {
    setMovedShipSize(null)
    document.removeEventListener('mousemove', documentMouseMoveHandler)
    document.removeEventListener('mouseup', shipMouseUpHandler)
  }

  const shipMouseDownHandler = (evt, number, size) => {
    if (number) {
      setMovedShipSize(size)
      if (movedShipEl.current) {
        const x = evt.pageX - evt.currentTarget.getBoundingClientRect().left
        const y = evt.pageY - evt.currentTarget.getBoundingClientRect().top
        setShift(x, y)
        movedShipEl.current.style.transform = `translate(${evt.pageX - x}px, ${evt.pageY - y}px)`
        document.addEventListener('mousemove', documentMouseMoveHandler)
        document.addEventListener('mouseup', shipMouseUpHandler)
      }
    }
  }

  return (
    <div className={classes.Settings}>
      <Field />

      <div className={classes.Description}>
        <p>You can place you ships <button>randomly</button></p>
        <p>or drag and drop them on the playfield. To place ship vertically click on it with right mouse button</p>
        <div ref={movedShipEl} className={clsx(classes.MovedShip, movedShipSize && classes.MovedShipVisible)}>{renderShip(movedShipSize)}</div>
        <ul className={classes.ShipsList}>
          {ships.map(ship => {
            return (
              <li key={`settings-ship-${ship.size}`} className={classes.ShipsListItem}>
                <span className={classes.ShipNumber}>{ship.number}x </span>
                <div
                  className={classes.Ship}
                  onMouseDown={(evt) => { shipMouseDownHandler(evt, ship.number, ship.size) }}
                >
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
