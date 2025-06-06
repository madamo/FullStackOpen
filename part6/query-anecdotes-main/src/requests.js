import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  console.log('getting anecdotes...')
  const result = await axios.get(baseUrl)
  return result.data
}

export const createAnecdote = async (newAnecdote) => {
  const result = await axios.post(baseUrl, newAnecdote)
  return result.data
}

export const updateVotes = async (object) => {
  const newVotes = object.votes
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}