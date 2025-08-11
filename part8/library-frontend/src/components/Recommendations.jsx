import { RECOMMENDED_BOOKS, ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = () => {

  const booksByGenre = useQuery(RECOMMENDED_BOOKS)
  console.log(booksByGenre)
  const user = useQuery(ME)
 
  if (booksByGenre.loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>

       <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.data.recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations