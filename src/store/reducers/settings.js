import { combineReducers } from 'redux'
import * as actionTypes from '../actions/action-types'
import { createReducer, updateObject } from '../../utils/store'

const initialState = {
  ships: [
    { size: 4, number: 1 },
    { size: 3, number: 2 },
    { size: 2, number: 3 },
    { size: 1, number: 4 }
  ],
  movedShipParams: {
    size: null,
    isHorizontal: true,
    isPositionCorrect: false
  }
}

const setMovedShipSize = (state, action) => {
  return updateObject(state, { size: action.payload })
}

const setMovedShipIsPositionCorrect = (state, action) => {
  return updateObject(state, { isPositionCorrect: action.payload })
}

const shipsReducer = createReducer(initialState.ships, {})

const movedShipParamsReducer = createReducer(initialState.movedShipParams, {
  [actionTypes.SET_MOVED_SHIP_SIZE]: setMovedShipSize,
  [actionTypes.SET_MOVED_SHIP_IS_POSITION_CORRECT]: setMovedShipIsPositionCorrect
})

export const settings = combineReducers({
  ships: shipsReducer,
  movedShipParams: movedShipParamsReducer
})
