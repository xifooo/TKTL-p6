import { useNotificationValue } from "../NotificationContext"


const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  // if (true) return null

  return (
    <div>
      {notification &&
        <div className="notification" style={style}>
          {notification}
        </div>
      }
    </div>
  )
}

export default Notification
