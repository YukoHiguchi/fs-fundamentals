import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const initialState = { anecdotes: [], status: "idle", error: null }
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAnecdotes.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchAnecdotes.fulfilled, (state, action) => {
        state.status = "succeeded"
        // Add any fetched anecdotes to the array
        state.anecdotes = state.anecdotes
          .concat(action.payload)
          .sort((a, b) => b.votes - a.votes)
      })
      .addCase(fetchAnecdotes.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addNewAnecdote.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.anecdotes.push(action.payload)
      })
      .addCase(voteAnecdote.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        state.status = "successed"
        const { content, votes, id } = action.payload
        const changedAnecdote = { content: content, votes: votes, id: id }
        state.anecdotes = state.anecdotes
          .map((a) => (a.id === id ? changedAnecdote : a))
          .sort((a, b) => b.votes - a.votes)
      })
  },
})

export const selectAllAnecdotes = (state) => state.anecdotes.anecdotes

export const addNewAnecdote = createAsyncThunk(
  "anecdotes/addNewAnecdote",
  async (initialAnecdote) => {
    const response = await anecdoteService.createNew(initialAnecdote)
    return response
  }
)
export const fetchAnecdotes = createAsyncThunk(
  "anecdotes/fetchAnecdotes",
  async () => {
    const response = await anecdoteService.getAll()
    return response
  }
)

export const voteAnecdote = createAsyncThunk(
  "anecdotes/voteAnecdote",
  async (initialAnecdote) => {
    const { id, content, votes } = initialAnecdote
    return await anecdoteService.update(id, {
      content: content,
      votes: votes + 1,
      id: id,
    })
  }
)
export default anecdoteSlice.reducer
