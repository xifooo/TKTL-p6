import { createSlice } from "@reduxjs/toolkit"


const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    // castOneVote: (state, action) => {
    //   const sentenceId = action.payload
    //   const anecdoteToChange = state.find(item => item.id === sentenceId)
    //   // console.log(anecdoteToChange)
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1
    //   }
    //   // const restOfAnecdotes = state.filter(item => item.id !== sentenceId)
    //   // return [...restOfAnecdotes, changedAnecdote]
    //   const newState = [...state]
    //   function merge(L, R, lst, LL, RL, begin, end) {
    //     if (begin < end) {
    //       if ((RL <= 0) || (LL > 0 && L[LL - 1].votes < R[RL - 1].votes)) {
    //         lst[end - 1] = L[LL - 1]
    //         LL -= 1
    //       } else {
    //         lst[end - 1] = R[RL - 1]
    //         RL -= 1
    //       }
    //       merge(L, R, lst, LL, RL, begin, end - 1)
    //     }
    //   }
    //   function mergeSort(lst, begin = 0, end = undefined) {
    //     if (end === undefined) { end = lst.length }
    //     // condition
    //     if (end - begin > 1) {
    //       let divider = Math.floor((begin + end + 1) / 2)
    //       mergeSort(lst, begin, divider)
    //       mergeSort(lst, divider, end)
    //       let L = lst.slice(begin, divider)
    //       let R = lst.slice(divider, end)
    //       merge(L, R, lst, L.length, R.length, begin, end)
    //     }
    //   }

    //   mergeSort(newState)
    //   return newState.map(item => (item.id !== sentenceId ? item : changedAnecdote))
    // },
    castOneVote: (state, action) => {
      const newState = state.map(item => item.id !== action.payload.id ? item : action.payload)

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
      return newState
    },

    createAnec: (state, action) => {
      // return [...state, asObject(action.payload)]
      // return state.push(action.payload)
      return state.concat(action.payload)
    },

    setAnecdotes: (state, aciton) => {
      return aciton.payload
    }
  }
})

export const { castOneVote, createAnec, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer