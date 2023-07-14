import { useDispatch } from "react-redux"
import { createAnec } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdoteService"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnec = async e => {
    try {
      e.preventDefault()
  
      const newAnec = {
        content: e.target.anecdote.value,
        votes: 0
      }
      const item = await anecdoteService.create(newAnec)
      dispatch(setNotification(`created one anecdote: ${item.content}`))
      dispatch(createAnec(item))

      e.target.anecdote.value = ""
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