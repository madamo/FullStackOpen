import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'

const Authors = () => {

  const result = useQuery(ALL_AUTHORS)
  const authors = []

  if (result.loading) {
    return <div>LOADING...</div>
  }

  if (!result.loading) {
    result.data.allAuthors.forEach(author => authors.push(author.name))
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BirthYearForm authors={authors} />
    </div>
  )
}

export default Authors