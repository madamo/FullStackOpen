import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/messageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, addLike } from './reducers/blogReducer'


const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [blogTitle, setBlogTitle] = useState('')
  //const [blogAuthor, setBlogAuthor] = useState('')
  //const [blogUrl, setBlogUrl] = useState('')
  //const [notification, setNotification] = useState({ message: null })

  const createBlogRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    if (user !== null) {
     dispatch(initializeBlogs(user))
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (blogObject) => {
    try {
      dispatch(createBlog(user, blogObject))
      createBlogRef.current.toggleVisibility()

    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async (id, blogObject) => {
    //console.log('handling like for', blogObject)
    //console.log(id)
    const convertedBlog = JSON.stringify(blogObject)
    dispatch(addLike(user, convertedBlog))
    /*try {
      blogService.setToken(user.token)
      const updatedBlog = await blogService.updateBlog(id, convertedBlog)
      console.log(updatedBlog)

      const blogToUpdate = blogs.findIndex((blog) => blog.id === id)
      setBlogs(blogs.toSpliced(blogToUpdate, 1, updatedBlog))

    } catch (error) {
      console.error(error)
      setNotification((`${error}`, true, 5))
    }*/
  }

  const handleRemove = async (id) => {
    console.log('removing blog', id)
    try {
      blogService.setToken(user.token)
      const removedBlog = await blogService.removeBlog(id)
      console.log(removedBlog)
      dispatch(setNotification('blog removed', false, 5))
      const blogToRemove = blogs.findIndex((blog) => blog.id === id)
      setBlogs(blogs.toSpliced(blogToRemove, 1))
    } catch (error) {
      console.error(error)
      dispatch(setNotification(`${error}`, true, 5))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />

        <Login 
          submitHandler={handleLogin}
          username={username} 
          updateUsername={setUsername} 
          password={password}
          updatePassword={setPassword} 
        />
      </div> 
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="Add Blog" ref={createBlogRef}>
        <CreateBlog
          handleCreate={handleCreate}
          />
      </Togglable>

      <BlogList />
    </div>
  )
}

export default App
