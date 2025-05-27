import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [blogTitle, setBlogTitle] = useState('')
  //const [blogAuthor, setBlogAuthor] = useState('')
  //const [blogUrl, setBlogUrl] = useState('')
  const [notification, setNotification] = useState({ message: null })

  const createBlogRef = useRef()

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

  //TO-DO: notification
  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

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
      
      // Save the logged in user data to state
      setUser(loggedInUser)
      
      // Reset the username and password
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
      notifyWith(`Invalid username or password`, true)
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
      //TO-DO: hide CreateBlog form
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
      //console.log(blogs.findIndex((blog) => blog.id === id))
      const blogToUpdate = blogs.findIndex((blog) => blog.id === id)
      setBlogs(blogs.toSpliced(blogToUpdate, 1, updatedBlog))
      //setBlogs(blogs.concat(updatedBlog))
      //let newBlogs = await blogService.getAll()
      //setBlogs(newBlogs)
    } catch (error) {
      console.error(error)
      notifyWith(`${error}`, true)
    }
  }

  if (user === null) {
    return (
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
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="Add Blog" ref={createBlogRef}>
        <CreateBlog
          handleCreate={handleCreate}
          />
        </Togglable>

      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} handleLike={handleLike} /> 
        )}
      </div>
    </div>
  )
}

export default App
