import * as actionTypes from '../actions/action-types'

const initialState = {
  ships: [
    { size: 4, number: 1 },
    { size: 3, number: 2 },
    { size: 2, number: 3 },
    { size: 1, number: 4 }
  ],
  movedShipSize: null
}

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVED_SHIP_SIZE:
      return { ...initialState, movedShipSize: action.payload }
    default:
      return state
  }
}
