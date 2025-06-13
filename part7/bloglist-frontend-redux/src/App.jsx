import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/messageReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const [blogs, setBlogs] = useState([])
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
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs.toSorted((a,b) => b.likes - a.likes) )
      ).catch(error => {
        console.log(error)
        console.log("use effect get")
      })
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

/*  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }*/

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
   const convertedBlog = JSON.stringify(blogObject)
    console.log(blogObject)
    try {
      blogService.setToken(user.token)
      const createdBlog = await blogService.createBlog(convertedBlog)
      console.log(createdBlog)
      setBlogs(blogs.concat(createdBlog))
      dispatch(setNotification(`${blogObject.title} by ${blogObject.author} added!`, false, 5))
      createBlogRef.current.toggleVisibility()
    } catch (error) {
      console.error(error)
      dispatch(setNotification(`${error}`, true, 5))
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
      setNotification((`${error}`, true, 5))
    }
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

      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} loggedInUser={user.username} /> 
        )}
      </div>
    </div>
  )
}

export default App
