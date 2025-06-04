import { createAnecdote } from '../reducers/anecdoteReducer'
import { showMessage, removeMessage } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    console.log("textbox value:", event.target.anecdote.value)
    dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(showMessage('new anecdote added!'))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
    event.target.anecdote.value = ''
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