import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  })

  return (
    <div>
      {notification && <div className="notification" style={style}>{notification}</div>}
    </div>
  )
}

export default Notification
