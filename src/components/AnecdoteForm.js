import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { sentToNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnec = async e => {
    try {
      e.preventDefault()
  
      const newAnec = {
        content: e.target.anecdote.value,
        votes: 0
      }
      dispatch(createAnecdote(newAnec))
      dispatch(sentToNotification(`created one anecdote: ${newAnec.content}`, 5))

      e.target.anecdote.value = ""
    } catch (exception) {
      dispatch(sentToNotification(`Some error occupying::: ${exception}`, 5))
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