import { BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {

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
        <Link to="/add-book" style={linkStyle}>add book</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
      </Routes>
  
    </Router>
  );
};

export default App;