import { createSlice } from "@reduxjs/toolkit"


const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    searchText: (state, action) => {
      return state = action.payload
    }
  }
})

export const { searchText } = filterSlice.actions
export default filterSlice.reducer