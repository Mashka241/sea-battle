const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

const updateIremInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      return item
    }

    const updatedItem = updateItemCallback(item)
    return updatedItem
  })

  return updatedItems
}

const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export { updateObject, updateIremInArray, createReducer }
