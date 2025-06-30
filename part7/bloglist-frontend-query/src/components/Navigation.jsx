import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../UserContext'
import styled from 'styled-components'

const NavMenu = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color:rgb(244, 244, 244);

  .user {
    width: 66%;
    text-align: right;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }
`

const Navigation = () => {

  const [user, userDispatch] = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'LOGOUT' })
  }

  const linkStyle = {
    paddingRight: 5
  }

  return (
    <NavMenu>
      <Link to="/" style={linkStyle}>blogs</Link>
      <Link to="/users" style={linkStyle}>users</Link>
      <span className="user">{user.name} is logged in <button onClick={handleLogout}>logout</button></span>

    </NavMenu>
  )
}

export default Navigation