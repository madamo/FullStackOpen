import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm))

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some(el => el.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phoneboook</h2>
      <Filter onChange={handleSearchTerm} />

      <AddPersonForm 
        nameValue={newName} 
        onNameChange={handleNameChange} 
        numValue={newNumber}
        onNumChange={handleNumberChange}
        onClick={addName}
      />
      
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App
