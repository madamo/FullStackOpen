import { useState } from 'react'
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  
  const result = useQuery(ALL_BOOKS)
  const genres = []
  const [booksToShow, setBooksToShow] = useState([])

  if (result.loading) {
    return <div>LOADING...</div>
  }

  const getGenres = (books) => {
    books.map(book => {
      book.genres.forEach(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      })
    })
  }

  const filterBooks = (genre) => {
    console.log('filtering by', genre)
    if (genre === 'all') {
      setBooksToShow(result.data.allBooks)
    } else {
      const filteredBooks = result.data.allBooks.filter(book => 
        book.genres.includes(genre)
      )

      setBooksToShow(filteredBooks)
      console.log(booksToShow)
    }
  }

  getGenres(result.data.allBooks)


  console.log(result)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.map(genre => <span key={genre}>{genre} </span>)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => 
        <button key={g} onClick={() => filterBooks(g)}>{g}</button>
      )}
      <button onClick={() => filterBooks('all')}>all genres</button>
    </div>
  )
}

export default Books