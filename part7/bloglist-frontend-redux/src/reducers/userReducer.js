import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return null
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer

export const initializeUser = (username, password) => {
  return async dispatch => {
    const loggedInUser = await loginService.login({ username, password })
    dispatch(setUser(loggedInUser))
  }
}

/*
const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)
    try {
      // Send username and password to login service to check credentials and get token
      const loggedInUser = await loginService.login({ username, password })

      // Save user data to local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))
      
      // Pass the token to the blog service to authenticate requests
      blogService.setToken(loggedInUser.token)
      console.log(loggedInUser)
      
      // Save the logged in user data to state
      setUser(loggedInUser)
      
      // Reset the username and password
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
      dispatch(setNotification(`Invalid username or password`, true, 5))
    }
  }
*/