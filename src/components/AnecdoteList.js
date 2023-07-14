import { useDispatch, useSelector } from "react-redux"
import { giveOneVote } from "../reducers/anecdoteReducer"
import { sentToNotification } from "../reducers/notificationReducer"



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
      dispatch(giveOneVote(id, changedObj))
      dispatch(sentToNotification(`you voted : ${obj.content}`, 5))

    } catch (exception) {
      dispatch(sentToNotification(`Some error occupying::: ${exception}`, 5))
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