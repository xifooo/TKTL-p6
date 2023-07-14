// import { useEffect } from "react"
import { useSelector } from "react-redux"
// import { sentToNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  // const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // useEffect(() => {
  //   if (notification) {
  //     setTimeout(() => {
  //       dispatch(setNotification(null))
  //     }, 5000)
  //   }
  // })
  // if (notification) {
  //   dispatch(sentToNotification(`you voted '${anecdote.content}'`))
  // }

  return (
    <div>
      {notification && <div className="notification" style={style}>{notification}</div>}
    </div>
  )
}

export default Notification
