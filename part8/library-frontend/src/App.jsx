import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'
import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

const App = () => {

  const [token, setToken] = useState(null)
  //const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  //const navigate = useNavigate()

  const logout = () => {
    console.log('logout')
    setToken(null)
    localStorage.removeItem('library-user-token', token)
    //navigate("/login")
  }

  const linkStyle = {
    padding: 5,
    margin: '0 5px',
    border: '1px solid black'
  }

  return (
    <Router>
      <div>
        <Link to="/" style={linkStyle}>authors</Link>
        <Link to="/books" style={linkStyle}>books</Link>
        { token && 
          <span>
            <Link to="/add-book" style={linkStyle}>add book</Link>
            <Link style={linkStyle} onClick={logout}>logout</Link>
          </span>
        }
        { !token && <Link to="/login" style={linkStyle}>login</Link>}
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} /> }/>
      </Routes>
  
    </Router>
  );
};

export default App;