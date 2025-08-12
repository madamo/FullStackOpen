import { useState } from 'react'
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = () => {

  const [genres, setGenres] = useState([])
  //const [booksToShow, setBooksToShow] = useState([])
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })

  if (result.loading) {
    return <div>LOADING...</div>
  }

  console.log(result)

  const getGenres = (books) => {
    // Create list of genres, then update state
    const libraryGenres = []
    books.map(book => {
      console.log(book)
      book.genres.forEach(genre => {
        if (!libraryGenres.includes(genre)) {
          libraryGenres.push(genre)
        }
      })
    })
    setGenres(libraryGenres)
  }

  const filterBooks = (genre) => {
    setFilter(genre)
  }

  if (genres.length === 0) {
    console.log('getting genres...')
    getGenres(result.data.allBooks)
  }


  return (
    <div>
      <h2>books</h2>
        <div>showing books in genre: {filter ? filter : 'all'}</div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => 
        <button key={g} onClick={() => filterBooks(g)}>{g}</button>
      )}
      <button onClick={() => filterBooks(null)}>all genres</button>
    </div>
  )
}

export default Books