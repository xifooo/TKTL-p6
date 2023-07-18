import React, { createContext, useReducer, useContext } from "react"


const reducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return action.payload
    case "CLEAR":
      return null
    default:
      return state
  }
}
const NotificationContext = createContext()

export default NotificationContext


export const ContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(reducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}


export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  const dispatch = useContext(NotificationContext)[1]
  return (msg) => {
    dispatch({type: "SEND", payload: msg})
    setTimeout(() => {
      dispatch({type: "CLEAR"})
    }, 5000)
  }
}
