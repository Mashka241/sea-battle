import { combineReducers } from 'redux'
import * as actionTypes from '../actions/action-types'
import { createReducer } from '../../utils/store'

const initialState = {
  ships: [
    { size: 4, number: 1 },
    { size: 3, number: 2 },
    { size: 2, number: 3 },
    { size: 1, number: 4 }
  ],
  movedShipSize: null
}

const setMovedShipSize = (state, action) => {
  return action.payload
}

const shipsReducer = createReducer(initialState.ships, {})

const movedShipSizeReducer = createReducer(initialState.movedShipSize, {
  [actionTypes.SET_MOVED_SHIP_SIZE]: setMovedShipSize
})

export const settings = combineReducers({
  ships: shipsReducer,
  movedShipSize: movedShipSizeReducer
})
