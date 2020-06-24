import * as actionTypes from './action-types'
export const actionCreator = {
  setMovedShipSize: (payload) => ({
    type: actionTypes.SET_MOVED_SHIP_SIZE,
    payload
  }),
  setMovedShipIsPositionCorrect: (payload) => ({
    type: actionTypes.SET_MOVED_SHIP_IS_POSITION_CORRECT,
    payload
  })
}
