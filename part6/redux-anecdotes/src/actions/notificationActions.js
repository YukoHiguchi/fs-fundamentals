import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "./actionTypes"

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({ type: SET_NOTIFICATION, message })
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION,
  }
}
