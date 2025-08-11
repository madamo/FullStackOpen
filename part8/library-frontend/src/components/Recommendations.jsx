import { RECOMMENDED_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = () => {

  const booksByGenre = useQuery(RECOMMENDED_BOOKS)
  console.log(booksByGenre)
 
  if (booksByGenre.loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>showing books with genre</h2>
      {booksByGenre.data.recommendedBooks.map(b => 
        <li key={b.title}>{b.title} {b.author.name}</li>
      )}
    </div>
  )
}

export default Recommendations