import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

 useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ).catch(error => {
      console.log(error)
    })
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)
    try {
      const loggedInUser = await loginService.login({ username, password })
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  if (user === null) {
    return (
      <div>
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
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} /> 
      )}
    </div>
  )
}

export default App
