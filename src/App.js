import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAll, create, update } from "./requests"

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotificationDispatch } from "./NotificationContext"


const App = () => {
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation(create, {
    onSuccess: (newData) => {
      // const anecdotes = queryClient.getQueriesData("anecdotes")
      // queryClient.setQueryData("anecdotes", anecdotes.concat(newData))
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const updateAnecMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const dispatch = useNotificationDispatch()

  const addAnecdote = content => {
    if (content.length >= 5) {
      const newObj = {
        content,
        votes: 0
      }
      newAnecMutation.mutate(newObj)
      dispatch(`anecdote: ${newObj.content} created`)
      // dispatch({type: "SEND", payload: `anecdote: ${newObj.content} created`})
    } else {
      dispatch("new anecdote too short")
      // dispatch({type: "SEND", payload: "new anecdote too short"})
      // window.alert("new anecdote too short")
      // return
    }
  }

  const handleVote = (anecdote) => {
    const chanedObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecMutation.mutate(chanedObj)
    // setNotification(chanedObj.content)
    dispatch(`anecdote :${anecdote.content}. voted`)
  }


  const result = useQuery("anecdotes", getAll, {
    refetchOnWindowFocus: false,
    retry: 3
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.error) {
    return <p>anecdote service not available due to problems in server</p>
  }

  const anecdotes = result.data

  return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <ul>
          {anecdotes.map(anecdote =>
            <li key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </li>
          )}
        </ul>

        <AnecdoteForm
          addAnecdote={addAnecdote}
        />
      </div>
  )
}

export default App
