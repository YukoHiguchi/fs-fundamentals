import { createSlice } from "@reduxjs/toolkit"

const initialState = "render here notification..."
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification(state, action) {
      return null
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer
