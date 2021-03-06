import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import Field from '../../ui/field/field'
import Cell from '../../ui/cell/cell'
import clsx from 'clsx'
import { actionCreator } from '../../../store/actions/action-creator'
import classes from './settings.module.scss'

const Settings = ({ ships, movedShipParams, setMovedShipSize, setMovedShipIsPositionCorrect, updateShips, setMovedShipHeadPosition, setShipsHorizontalPosition, setMovedShipHorizontalPosition }) => {
  const [field, setField] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    } else {
      for (let i = startX; i < (startX + 3); i++) {
        for (let j = startY; j < (startY + checkedSize); j++) {
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
        setMovedShipHeadPosition({
          x: cellCoordsX,
          y: cellCoordsY
        })
        setMovedShipIsPositionCorrect(isPositionCorrect)
      }
    }
  }

  const placeShip = ({ size, headX, headY, isHorizontal }) => {
    const newField = field.map(row => {
      return [...row]
    })
    newField[headY][headX] = 1

    if (isHorizontal) {
      for (let i = 1; i < size; i++) {
        newField[headY][headX + i] = 1
      }
    }

    setField(newField)
  }

  const shipMouseUpHandler = () => {
    if (movedShipParams.isPositionCorrect) {
      updateShips(movedShipParams.size)
      placeShip(movedShipParams)
      setMovedShipSize(null)
    } else {
      setMovedShipSize(null)
    }
  }

  const shipMouseDownHandler = (evt, number, size, isHorizontal) => {
    if (number) {
      setMovedShipSize(size)
      setMovedShipHorizontalPosition(isHorizontal)
      if (movedShipEl.current) {
        const x = evt.pageX - evt.currentTarget.getBoundingClientRect().left
        const y = evt.pageY - evt.currentTarget.getBoundingClientRect().top
        setShift({ x, y })
        movedShipEl.current.style.transform = `translate(${evt.pageX - x}px, ${evt.pageY - y}px)`
      }
    }
  }

  const turnButtonClickHandler = (size) => {
    setShipsHorizontalPosition(size)
  }

  useEffect(() => {
    document.addEventListener('mousemove', documentMouseMoveHandler)
    document.addEventListener('mouseup', shipMouseUpHandler)
    return () => {
      document.removeEventListener('mousemove', documentMouseMoveHandler)
      document.removeEventListener('mouseup', shipMouseUpHandler)
    }
  }, [documentMouseMoveHandler, shipMouseUpHandler])

  return (
    <div className={classes.Settings}>
      <div ref={fieldRef}>
        <Field field={field} />
      </div>

      <div className={classes.Description}>
        <p>You can place you ships <button>randomly</button></p>
        <p>or drag and drop them on the playfield. To place ship vertically click on it with right mouse button</p>
        <div ref={movedShipEl} className={clsx(classes.MovedShip, movedShipParams.size && classes.MovedShipVisible, movedShipParams.isHorizontal && classes.MovedShipHorizontal)}>{renderShip(movedShipParams.size)}</div>
        <ul className={classes.ShipsList}>
          {ships.map(ship => {
            return (
              <li key={`settings-ship-${ship.size}`} className={classes.ShipsListItem}>
                <span className={classes.ShipNumber}>{ship.number}x </span>
                {ship.size > 1
                  ? (
                    <button className={classes.TurnButton} onClick={() => { turnButtonClickHandler(ship.size) }}>
                      {/* <span>turn the ship</span> */}
                    </button>
                  ) : null}
                <div
                  className={clsx(classes.Ship, ship.isHorizontal && classes.ShipHorizontal)}
                  onMouseDown={(evt) => { shipMouseDownHandler(evt, ship.number, ship.size, ship.isHorizontal) }}
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
    },
    updateShips: (data) => {
      dispatch(actionCreator.updateShips(data))
    },
    setMovedShipHeadPosition: (data) => {
      dispatch(actionCreator.setMovedShipHeadPosition(data))
    },
    setShipsHorizontalPosition: (data) => {
      dispatch(actionCreator.setShipsHorizontalPosition(data))
    },
    setMovedShipHorizontalPosition: (data) => {
      dispatch(actionCreator.setMovedShipHorizontalPosition(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
