import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    clearNotification: (state, action) => {
      return state = null
    }
  }
})

export const sentToNotification = (msg, duration) => {
  return dispatch => {
    dispatch(setNotification(msg))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer