import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"
import { sentToNotification } from "./notificationReducer"


const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    castOneVote: (state, action) => {
      state = state.map(item => item.id !== action.payload.id ? item : action.payload)
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
      return newState
    },

    appendAnec: (state, action) => {
      return state.concat(action.payload)
    },

    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = obj => {
  return async dispatch => {
    const returnedObj = await anecdoteService.create(obj)
    dispatch(appendAnec(returnedObj))
  }
}

export const giveOneVote = (id, changedObj) => {
  return async dispatch => {
    try {
      const returnedObj = await anecdoteService.update(id, changedObj)
      dispatch(castOneVote(returnedObj))
    } catch (exception) {
      dispatch(sentToNotification(`error: ${exception}`, 10))
    }
    // HTTP-PUT and partial modification have consistent issue
  }
}

export const { castOneVote, appendAnec, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer