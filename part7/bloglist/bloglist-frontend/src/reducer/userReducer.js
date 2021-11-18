const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return state = action.user
  case 'LOGOUT_USER':
    return state = null
  default:
    return state
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN_USER',
      user,
    })
  }
}

export const logoutUser = () => {
  window.localStorage.clear()
  return {
    type: 'LOGOUT_USER',
  }
}

export default userReducer