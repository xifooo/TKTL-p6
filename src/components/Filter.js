import { useDispatch, useSelector } from "react-redux"
import { searchText } from "../reducers/filterReducer"
import { setNotification } from "../reducers/notificationReducer"

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    try {
      dispatch(searchText(event.target.value))
    } catch (exception) {
      dispatch(setNotification(`Some error occupying::: ${exception}`))
    }
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input 
      value={filter}
      onChange={handleChange} />
    </div>
  )
}

export default Filter