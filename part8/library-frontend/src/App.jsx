import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notification from './components/Notififcation'
import Recommendations from './components/Recommendations'

import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { useSubscription, useApolloClient } from '@apollo/client'

export const updateCache = (cache, query, addedBook) => {
  console.log(cache)
    const uniqByTitle = (b) => {
      let seen = new Set()
      return b.filter((item) => {
        let k = item.title
        return seen.has(k) ? false : seen.add(k)
      })
    }

    cache.updateQuery(query, (data) => {
      console.log('in updateQuery:', cache)
      console.log('query', query)
      return {
        allBooks: uniqByTitle(data.allBooks.concat(addedBook))
      }
    })
  }

const App = () => {

  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const client = useApolloClient()

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

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      //console.log(client.cache)
      window.alert(`${data.data.bookAdded.title} added!`)
      updateCache(client.cache, { query: ALL_BOOKS }, data.data.bookAdded )
    }
  })

  useEffect(() => {
    const loggedInUser = localStorage.getItem('library-user-token')

    if (loggedInUser) {
      setToken(loggedInUser)
    }
  }, [])

  const linkStyle = {
    padding: 5,
    margin: '0 5px',
    border: '1px solid black'
  }

  const menuStyle = {
    margin: "10px 0"
  }

  return (
    <Router>
      <div style={menuStyle}>
        <Link to="/" style={linkStyle}>authors</Link>
        <Link to="/books" style={linkStyle}>books</Link>
        { token 
          ? 
            <span>
              <Link to="/add-book" style={linkStyle}>add book</Link>
              <Link to="/recommend" style={linkStyle}>recommend</Link>

              <Link style={linkStyle} onClick={logout}>logout</Link>
            </span>
          :
            <Link to="/login" style={linkStyle}>login</Link>
        }
      </div>
      <Notification errorMessage={errorMessage}/>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook setError={notify} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} /> }/>
        <Route path="/recommend" element={<Recommendations /> }/>
      </Routes>
  
    </Router>
  );
};

export default App;