const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (sentence) => {
  return {
    content: sentence,
    id: getId(),
    votes: 0
  }
}

const initialState = (() => anecdotesAtStart.map(asObject)) ()

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "CAST_ONE_VOTE":
      const sentenceId = action.data
      const anecdoteToChange = state.find(item => item.id === sentenceId)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(item => item.id !== sentenceId ? item : changedAnecdote)

    case "CREATE_ANEC":
      return [...state, action.data]

    default:
      return state
  }
}

export const castOneVote = sentenceId => {
  return {
    type: "CAST_ONE_VOTE",
    data: sentenceId
  }
}

export const createAnec = content => {
  return {
    type: "CREATE_ANEC",
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer