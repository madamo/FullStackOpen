import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

//const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },

  }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (anecdote) => {
  return async dispatch => {
    //const anecdoteToChange = state.find (anecdote => anecdote.id === id)
    const changedAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
    } 
    const updatedAnecdote = await anecdoteService.addVote(changedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer