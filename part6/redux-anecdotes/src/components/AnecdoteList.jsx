import { incrementVote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/messageReducer'
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
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })

  const handleVote = (anecdote) => {
    dispatch(incrementVote(anecdote))
    dispatch(setNotification(`voted for ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList