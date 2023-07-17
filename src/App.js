import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAll, create, update } from "./requests"

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation(create, {
    onSuccess: (newData) => {
      const anecdotes = queryClient.getQueriesData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.concat(newData))
      // queryClient.invalidateQueries("anecdotes")
    }
  })

  const updateAnecMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const addAnecdote = content => {
    if (content.length >= 5){
      const newObj = {
        content,
        votes: 0
      }
      newAnecMutation.mutate(newObj)
    } else {
      window.alert("new anecdote too short")
      return
    }
  }

  const handleVote = (anecdote) => {
    const chanedObj = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecMutation.mutate(chanedObj)
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

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}

      <AnecdoteForm
        addAnecdote={addAnecdote}
      />
    </div>
  )
}

export default App
