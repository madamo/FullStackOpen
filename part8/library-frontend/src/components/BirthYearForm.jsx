import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthYearForm = () => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [error, setError] = useState('')
  const [changeBirthYear, result] = useMutation(EDIT_AUTHOR, {
          refetchQueries: [ {query: ALL_AUTHORS }],
        })

  const submit = (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, born }})
    
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Person not found')
    }
  }, [result.data])
  
  return (
    <div>
      <h2>Set birthyear</h2>
      {error && <div>{error}</div>}

      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={( { target }) => setName(target.value)} />
        </div>
        <div>
          born <input type="number" value={born} onChange={( { target }) => setBorn(parseInt(target.value))} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>

  )
}

export default BirthYearForm