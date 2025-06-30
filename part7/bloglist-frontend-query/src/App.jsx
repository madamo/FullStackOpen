import { useState, useEffect, useReducer } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import NotificationContext from './NotificationContext'
import loginService from './services/login'
import { setToken, getUsers } from './requests'
import UserContextProvider from './UserContext'
import { 
  Routes,
  Route,
 } from 'react-router-dom'
 import styled from 'styled-components'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      console.log('setting message...')
      return action.payload
    case "CLEAR_MESSAGE":
      console.log('removing message')
      return ''
    default:
      return state
  }
}

const userReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      console.log('logging in')
      return action.payload
    case "LOGOUT":
      console.log('logging out')
      return null
    default:
      return state
  }
}

const Page = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Helvetica, sans-serif;
    position: relative;
  `


const App = () => {
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const [user, userDispatch] = useReducer(userReducer, null)

  useEffect(() => {
    if (user !== null) {
      setToken(user.token)
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: { username: currentUser.username, name: currentUser.name, token: currentUser.token }})
      setToken(currentUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)
    try {
      // Send username and password to login service to check credentials and get token
      const loggedInUser = await loginService.login({ username, password })

      // Save user data to local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))
      
      // Pass the token to the blog service to authenticate requests
      setToken(loggedInUser.token)
      console.log(loggedInUser)
      
      // Save the logged in user data to state
      userDispatch({ type: 'LOGIN', payload: { username: loggedInUser.username, name: loggedInUser.name, token: loggedInUser.token }})
      
      // Reset the username and password
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
      notificationDispatch({ type: 'SET_MESSAGE', payload: { message: 'Invalid username or password', isError: true }})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE' })
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <Page>
          <Notification notification={notification} />

          <Login 
            submitHandler={handleLogin}
            username={username} 
            updateUsername={setUsername} 
            password={password}
            updatePassword={setPassword} 
          />
        </Page> 
      </NotificationContext.Provider>
    )
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <UserContextProvider value={[user, userDispatch]}>
        <Page>
          <Navigation />
          <Notification notification={notification} />
          <Routes>
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/users" element={ <Users /> } />
            <Route path="/" element={ <BlogList loggedInUser={user.username} /> } />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </Page>
      </UserContextProvider>
    </NotificationContext.Provider>
  )
}

export default App
