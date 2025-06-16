import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
//import Blog from './components/Blog'
import BlogList from './components/BlogList'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setToken } from './requests'

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


const App = () => {
  const queryClient = useQueryClient()
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [blogTitle, setBlogTitle] = useState('')
  //const [blogAuthor, setBlogAuthor] = useState('')
  //const [blogUrl, setBlogUrl] = useState('')
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const createBlogRef = useRef()

  useEffect(() => {
    if (user !== null) {
      setToken(user.token)
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
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
      setUser(loggedInUser)
      
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
    setUser(null)
  }

  const handleCreate = async (blogObject) => {
   const convertedBlog = JSON.stringify(blogObject)
    console.log(blogObject)
    try {
      blogService.setToken(user.token)
      const createdBlog = await blogService.createBlog(convertedBlog)
      console.log(createdBlog)
      setBlogs(blogs.concat(createdBlog))
      notifyWith(`${blogObject.title} by ${blogObject.author} added!`)
      createBlogRef.current.toggleVisibility()
    } catch (error) {
      console.error(error)
      notifyWith(`${error}`, true)
    }
  }

  const handleLike = async (id, blogObject) => {
    console.log('handling like for', blogObject)
    console.log(id)
    const convertedBlog = JSON.stringify(blogObject)
    try {
      blogService.setToken(user.token)
      const updatedBlog = await blogService.updateBlog(id, convertedBlog)
      console.log(updatedBlog)

      const blogToUpdate = blogs.findIndex((blog) => blog.id === id)
      setBlogs(blogs.toSpliced(blogToUpdate, 1, updatedBlog))

    } catch (error) {
      console.error(error)
      notifyWith(`${error}`, true)
    }
  }

  const handleRemove = async (id) => {
    console.log('removing blog', id)
    try {
      blogService.setToken(user.token)
      const removedBlog = await blogService.removeBlog(id)
      console.log(removedBlog)
      notifyWith('blog removed')
      const blogToRemove = blogs.findIndex((blog) => blog.id === id)
      setBlogs(blogs.toSpliced(blogToRemove, 1))
    } catch (error) {
      console.error(error)
      notifyWith(`${error}`, true)
    }
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

    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="Add Blog" ref={createBlogRef}>
        <CreateBlog
          handleCreate={handleCreate}
          />
        </Togglable>

      <BlogList />
    </div>
    </NotificationContext.Provider>

  )
}

export default App
