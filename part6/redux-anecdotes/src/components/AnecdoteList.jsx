import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  voteAnecdote,
  selectAllAnecdotes,
  fetchAnecdotes,
} from "../reducers/anecdoteReducer"
import { setNotification } from "../actions/notificationActions"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(selectAllAnecdotes)
  const anecdoteStatus = useSelector((state) => state.anecdotes.status)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    if (anecdoteStatus === "idle") {
      dispatch(fetchAnecdotes())
    }
  }, [anecdoteStatus, dispatch])
  let resultAnecdotes = anecdotes

  if (anecdoteStatus === "loading") {
    return <div>loading</div>
  } else if (anecdoteStatus === "successed") {
    if (filter) {
      resultAnecdotes = anecdotes.filter((anecdote) => {
        if (anecdote?.content.match(`${filter}`)) {
          return anecdote
        }
      })
    } else {
      resultAnecdotes = anecdotes
    }
  }
  return (
    <div>
      {resultAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={async () => {
                await dispatch(
                  voteAnecdote({
                    content: anecdote.content,
                    votes: anecdote.votes,
                    id: anecdote.id,
                  })
                ).unwrap()
                dispatch(setNotification(`you voted '${anecdote.content}`, 5))
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
