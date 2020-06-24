import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import Field from '../../ui/field/field'
import Cell from '../../ui/cell/cell'
import clsx from 'clsx'
import { actionCreator } from '../../../store/actions/action-creator'
import classes from './settings.module.scss'

const Settings = ({ ships, movedShipParams, setMovedShipSize, setMovedShipIsPositionCorrect }) => {
  const [field, setField] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ])

  const movedShipEl = useRef(null)
  const fieldRef = useRef(null)

  const [shift, setShift] = useState({
    x: 0,
    y: 0
  })

  const renderShip = (number) => {
    const shipArr = []
    for (let i = 0; i < number; i++) {
      shipArr.push(<Cell key={`settings-ship-cell${number}-${i}`} type={0} />)
    }
    return shipArr
  }

  const checkShipPosition = (x, y, size, isHorizontal = true) => {
    const startX = x - 1
    const startY = y - 1
    const checkedSize = size + 2
    if (isHorizontal) {
      for (let i = startY; i < (startY + 3); i++) {
        for (let j = startX; j < (startX + checkedSize); j++) {
          if (field[i]) {
            if (field[i][j] === 1) {
              return false
            }
          } else {
            break
          }
        }
      }
    }
    return true
  }

  const documentMouseMoveHandler = (evt) => {
    if (movedShipParams.size) {
      movedShipEl.current.style.transform = `translate(${evt.pageX - shift.x}px, ${evt.pageY - shift.y}px)`
      const fieldCoords = {
        top: fieldRef.current.getBoundingClientRect().top,
        left: fieldRef.current.getBoundingClientRect().left,
        right: fieldRef.current.getBoundingClientRect().right,
        bottom: fieldRef.current.getBoundingClientRect().bottom
      }
      const currentShipCoords = {
        top: movedShipEl.current.getBoundingClientRect().top,
        left: movedShipEl.current.getBoundingClientRect().left,
        right: movedShipEl.current.getBoundingClientRect().right,
        bottom: movedShipEl.current.getBoundingClientRect().bottom
      }

      const isShipOnTheField = (fieldCoords.top < currentShipCoords.top) &&
      (fieldCoords.left < currentShipCoords.left) &&
      (fieldCoords.right > currentShipCoords.right) &&
      (fieldCoords.bottom > currentShipCoords.bottom)

      if (isShipOnTheField) {
        const x = evt.clientX - fieldCoords.left - shift.x
        const y = evt.clientY - fieldCoords.top - shift.y
        const cellCoordsX = Math.round(x / 50)
        const cellCoordsY = Math.round(y / 50)
        const isPositionCorrect = checkShipPosition(cellCoordsX, cellCoordsY, movedShipParams.size)
        setMovedShipIsPositionCorrect(isPositionCorrect)
      }
    }
  }

  const shipMouseUpHandler = (evt) => {
    console.log(evt.clientX, evt.clientY)

    if (movedShipParams.isPositionCorrect) {
      console.log('place ship')
    } else {
      setMovedShipSize(null)
    }
  }

  const shipMouseDownHandler = (evt, number, size) => {
    if (number) {
      setMovedShipSize(size)
      if (movedShipEl.current) {
        const x = evt.pageX - evt.currentTarget.getBoundingClientRect().left
        const y = evt.pageY - evt.currentTarget.getBoundingClientRect().top
        setShift({ x, y })
        movedShipEl.current.style.transform = `translate(${evt.pageX - x}px, ${evt.pageY - y}px)`
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', documentMouseMoveHandler)
    document.addEventListener('mouseup', shipMouseUpHandler)
    return () => {
      document.removeEventListener('mousemove', documentMouseMoveHandler)
      document.removeEventListener('mouseup', shipMouseUpHandler)
    }
  }, [movedShipParams, documentMouseMoveHandler, shipMouseUpHandler])

  return (
    <div className={classes.Settings}>
      <div ref={fieldRef}>
        <Field field={field} />
      </div>

      <div className={classes.Description}>
        <p>You can place you ships <button>randomly</button></p>
        <p>or drag and drop them on the playfield. To place ship vertically click on it with right mouse button</p>
        <div ref={movedShipEl} className={clsx(classes.MovedShip, movedShipParams.size && classes.MovedShipVisible)}>{renderShip(movedShipParams.size)}</div>
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

const mapStateToProps = (state) => {
  return {
    ships: state.settings.ships,
    movedShipParams: state.settings.movedShipParams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMovedShipSize: (data) => {
      dispatch(actionCreator.setMovedShipSize(data))
    },
    setMovedShipIsPositionCorrect: (data) => {
      dispatch(actionCreator.setMovedShipIsPositionCorrect(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
