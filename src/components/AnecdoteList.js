import { useDispatch, useSelector } from "react-redux"
import { castOneVote } from "../reducers/anecdoteReducer"

const AnecdoteRow = ({ msg, handleClick }) => {
  return (
    <li>
      {msg.content}
      <button onClick={handleClick}> VOTE </button>
      <br />
      <strong>{msg.votes}</strong>  votes btained
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  console.log("anecdotes:", anecdotes)

  function merge(L, R, lst, LL, RL, begin, end) {
    if (begin < end) {
      if ((RL <= 0) || (LL > 0 && L[LL - 1].votes > R[RL - 1].votes)) {
        lst[end - 1] = L[LL - 1]
        LL -= 1
      } else {
        lst[end - 1] = R[RL - 1]
        RL -= 1
      }
      merge(L, R, lst, LL, RL, begin, end - 1)
    }
  }
  function mergeSort(lst, begin = 0, end = undefined) {
    if (end === undefined) { end = lst.length }
    // condition
    if (end - begin > 1) {
      let divider = Math.floor((begin + end + 1) / 2)
      mergeSort(lst, begin, divider)
      mergeSort(lst, divider, end)
      let L = lst.slice(begin, divider)
      let R = lst.slice(divider, end)
      merge(L, R, lst, L.length, R.length, begin, end)
    }
  }

  mergeSort(anecdotes)

  return (
    <ul>
      {anecdotes.map(item =>
        <AnecdoteRow
          key={item.id}
          msg={item}
          handleClick={() => dispatch(castOneVote(item.id))}
        />
      )
      }
    </ul>
  )
}

export default AnecdoteList