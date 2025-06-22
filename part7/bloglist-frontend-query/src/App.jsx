import { useState, useEffect, useReducer } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import loginService from './services/login'
import { setToken, getUsers } from './requests'
import UserContext from './UserContext'
import { 
  Routes,
  Route,
  Link
 } from 'react-router-dom'


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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'LOGOUT' })
  }

  const Users = () => {

    const queryClient = useQueryClient()

    const users = useQuery({
        queryKey: ['users'],
        placeholderData: [],
        queryFn: getUsers,
        retry: false
      })
    const userList = users.data

      const liStyle = {
        listStyle: 'none',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
      }

      const divStyle = {
      }

      const columnLabel = {
        width: '100%',
        textAlign: 'right'
      }

      const containerStyle = {
        width: '250px'
      }

    return (
      <div style={containerStyle}>
        <h2>Users</h2>
        <div style={columnLabel}><b>blogs created</b></div>
        {userList.map(user => 
          <li key={user.id} style={liStyle}>
            <div style={divStyle}>{user.name}</div>
            <div style={divStyle}>{user.blogs.length}</div>
          </li>
        )}
      </div>
    )
  }

  if (user === null) {
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <div>
          <Notification notification={notification} />

          <Login 
            submitHandler={handleLogin}
            username={username} 
            updateUsername={setUsername} 
            password={password}
            updatePassword={setPassword} 
          />
        </div> 
      </NotificationContext.Provider>
    )
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <UserContext.Provider value={user}>
        <div>
          <h2>Blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
          <Routes>
            <Route path="/users" element={ <Users /> } />
            <Route path="/" element={ <BlogList loggedInUser={user.username} /> } />
          </Routes>
        </div>
      </UserContext.Provider>
    </NotificationContext.Provider>
  )
}

export default App
