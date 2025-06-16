import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/messageReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, addLike, deleteBlog } from './reducers/blogReducer'
import { initializeUser, setUser, logoutUser } from './reducers/userReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  
  const createBlogRef = useRef()

  const dispatch = useDispatch()

  const user = useSelector(state => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(state.user))
    return state.user
  })

  useEffect(() => {
    if (user !== null) {
     dispatch(initializeBlogs(user))
    }
  }, [user])

  /*useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])*/

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)
    try {
      // Send username and password to login service to check credentials and get token
      //const loggedInUser = await loginService.login({ username, password })

      // Save user data to local storage
      //window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))
      
      // Pass the token to the blog service to authenticate requests
      //blogService.setToken(loggedInUser.token)
      //console.log(loggedInUser)
      
      // Save the logged in user data to state
      //setUser(loggedInUser)
      dispatch(initializeUser(username, password))
      
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
    //setUser(null)
    dispatch(logoutUser())
  }

  const handleCreate = async (blogObject) => {
    try {
      dispatch(createBlog(user, blogObject))
      createBlogRef.current.toggleVisibility()

    } catch (error) {
      console.log(error)
    }
  }

  /*const handleLike = async (id, blogObject) => {
    dispatch(addLike(user, blogObject))
  }*/

  /*const handleRemove = async (blog) => {
    dispatch(deleteBlog(user, blog))
    dispatch(setNotification(`${blog.title} removed`, false, 5))
  }*/

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

      <BlogList loggedInUser={user.username} />
    </div>
  )
}

export default App
