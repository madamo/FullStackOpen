import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const AnecdoteForm = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      notificationDispatch({ type: 'SET_MESSAGE', payload: 'anecdote created' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE' })
      }, 5000)
    },
    onError: (error) => {
      console.log(error.response.status)
      if (error.response.status === 400){
        notificationDispatch({ type: 'SET_MESSAGE', payload: 'anecdote must be 5 or more characters' })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_MESSAGE' })
        }, 5000)
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
