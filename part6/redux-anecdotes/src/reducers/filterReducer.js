import { createSlice } from "@reduxjs/toolkit"

const sclice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      return action.payload
    },
  },
})

export const { filterChange } = sclice.actions
export default sclice.reducer
