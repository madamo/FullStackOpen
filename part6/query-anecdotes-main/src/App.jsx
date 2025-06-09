import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateVotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
//import { NotificationContextProvider } from './NotificationContext'
import NotificationContext from './NotificationContext'
//import { useContext } from 'react'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      console.log('setting message')
      return action.payload
    case "CLEAR_MESSAGE":
      console.log('removing message')
      return ''
    default:
      return state
  }
}

const App = () => {

  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const updateVoteMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'SET_MESSAGE', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_MESSAGE' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    placeholderData: [], // why did adding this fix issue of queryFn not being called?
    queryFn: getAnecdotes,
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isError) {
    console.log(result.isError.message)
    return <div>anecdote service not available due to problems with server</div>
  }
  const anecdotes = result.data


  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
