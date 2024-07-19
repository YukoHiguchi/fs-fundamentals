import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) => {
        console.log("filter", state.filter, anecdote)
        if (anecdote?.content.match(`${state.filter}`)) {
          return anecdote
        }
      })
    } else {
      return state.anecdotes
    }
  })

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote.id))
                dispatch(setNotification(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                  dispatch(removeNotification())
                }, 5000)
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
