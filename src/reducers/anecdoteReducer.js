import { createSlice } from "@reduxjs/toolkit"

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

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: anecdotesAtStart.map(item => asObject(item)),
  reducers: {
    castOneVote: (state, action) => {
      const sentenceId = action.payload
      const anecdoteToChange = state.find(item => item.id === sentenceId)
      // console.log(anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = [...state]
      function merge(L, R, lst, LL, RL, begin, end) {
        if (begin < end) {
          if ((RL <= 0) || (LL > 0 && L[LL - 1].votes < R[RL - 1].votes)) {
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

      mergeSort(newState)
      return newState.map(item => (item.id !== sentenceId ? item : changedAnecdote))
    },
    createAnec: (state, action) => {
      return [...state, asObject(action.payload)]
    },
  }
})

export const { castOneVote, createAnec } = anecdoteSlice.actions
export default anecdoteSlice.reducer