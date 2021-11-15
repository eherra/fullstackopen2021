let isTimeoutRunning

const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return state = action.notification
      case 'REMOVE_NOTIFICATION':
          return state = null
        default:
          return state
    }
}

export const setNotification = (notification, timeInSeconds) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })

    if (isTimeoutRunning) {
      clearTimeout(isTimeoutRunning)
    }

    isTimeoutRunning = setTimeout(() => {
      dispatch(removeNotification())
    }, timeInSeconds*1000)  
  }
}

export const removeNotification = () => {
    return {
      type: 'REMOVE_NOTIFICATION',
    }
}

export default notificationReducer