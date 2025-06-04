import { createAnecdote } from '../reducers/anecdoteReducer'
import { showMessage, removeMessage } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    
    dispatch(createAnecdote(newAnecdote))
    dispatch(showMessage('new anecdote added!'))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
  
  return (
    <> 
    <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </> 
  )
}

export default AnecdoteForm