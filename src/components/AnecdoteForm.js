import { useDispatch } from "react-redux"
import { createAnec } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnec = e => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(createAnec(content))
  }

  return(
    <form onSubmit={addAnec}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm