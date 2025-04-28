import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import Person from './components/Person'
import personService from './services/persons'


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm))

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
  
  const exists = persons.some(el => el.name === newName)

    if (exists) {
      const existingPerson = persons.find(p => p.name === newName)
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const changedPerson = { ...existingPerson, number: newNumber}
        if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
          personService.update(existingPerson.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
            })
            .catch(error => {
              alert(`the person ${existingPerson.name} could not be updated`)
            })
        } else {
          console.log('update canceled')
        }
      }
    } else if (!exists) {
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleRemovePerson = (id) => {
    personService.removePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <ul>
        {personsToShow.map(person =>
          <Person 
            key={person.id}
            name={person.name}
            number={person.number}
            removePerson={() => handleRemovePerson(person.id)}
          />
        )}
      </ul>
      
    </div>
  )
}

export default App
