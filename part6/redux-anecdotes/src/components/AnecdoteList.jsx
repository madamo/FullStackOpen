import { incrementVote } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from 'react-redux'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </>
  )
}


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(incrementVote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList