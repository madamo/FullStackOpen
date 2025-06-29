import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../UserContext'

const Navigation = () => {

  const user = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'LOGOUT' })
  }

  const linkStyle = {
    paddingRight: 5
  }

  const menuStyle = {
    padding: 5,
    backgroundColor: 'lightgrey'
  }

  return (
  <div style={menuStyle}>
    <Link to="/" style={linkStyle}>blogs</Link>
    <Link to="/users" style={linkStyle}>users</Link>
    <span>{user.name} is logged in <button onClick={handleLogout}>logout</button></span>

  </div>
  )
}

export default Navigation