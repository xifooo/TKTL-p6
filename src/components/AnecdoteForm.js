import { useDispatch } from "react-redux"
import { createAnec } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnec = e => {
    try {
      e.preventDefault()
  
      const content = e.target.anecdote.value
      e.target.anecdote.value = ""
      dispatch(createAnec(content))
      dispatch(setNotification(`created one anecdote: ${content}`))
    } catch (exception) {
      dispatch(setNotification(`Some error occupying::: ${exception}`))
    }
  }

  return(
    <form onSubmit={addAnec}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm