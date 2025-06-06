import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  console.log('getting anecdotes...')
  const result = await axios.get('http://localhost:3001/anecdotes')
  return result.data
}
