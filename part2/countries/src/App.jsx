import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  //const [country, setCountry] = useState(null)

  useEffect(() => {
    countryService.getAll()
      .then(countryList => {
        console.log(countryList)
        setCountries(countryList)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm) )

  if (countriesToShow.length === 1) {
    console.log(countriesToShow[0].name.common)
  }
  

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
    console.log(searchTerm)
  }

  


  return (
    <div>
      <Filter onChange={handleSearchTerm} />
      <CountryList countriesToShow={countriesToShow} />
    </div>
  )
}

export default App
