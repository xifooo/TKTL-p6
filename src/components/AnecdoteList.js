import { useDispatch, useSelector } from "react-redux"
import { castOneVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdoteService"


const AnecdoteRow = ({ msg, handleClick }) => {
  return (
    <li>
      {msg.content}
      <button onClick={handleClick}> VOTE </button>
      <br />
      <strong>{msg.votes}</strong>  votes obtained
    </li>
  )
}


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const searchText = useSelector(state => state.filter)
  const anecdotes = useSelector(({ filter, anecdote }) => {
    if (filter === "") {
      return anecdote
    }
    return filter === ""
      ? anecdote
      : anecdote.filter(item => item.content.toUpperCase().indexOf(searchText.toUpperCase()) !== -1)
  })

  console.log("anecdotes:", anecdotes)

  const addVote = id => {
    try {
      const obj = anecdotes.find(item => item.id === id)
      const changedObj = { ...obj, votes: obj.votes + 1 }
      anecdoteService
        .update(id, changedObj)
        .then(returnedObj => {
          dispatch(castOneVote(returnedObj))
          dispatch(setNotification(`cast one vote`))
        })
    } catch (exception) {
      dispatch(setNotification(`Some error occupying::: ${exception}`))
    }
  }

  return (
    <ul>
      {anecdotes.map(item =>
        <AnecdoteRow
          key={item.id}
          msg={item}
          handleClick={() => addVote(item.id)}
        />
      )
      }
    </ul>
  )
}

export default AnecdoteList