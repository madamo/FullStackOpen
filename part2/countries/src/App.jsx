import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import CountryData from './components/CountryData'
import CountryElement from './components/CountyElement'
import Weather from './components/Weather'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    countryService.getAll()
      .then(countryList => {
        console.log(countryList)
        setCountries(countryList)
      })
  }, [])



  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm))

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
    console.log(searchTerm)
  }

  const handleClick = (name) => {
    console.log(name)
    setSearchTerm(name.toLowerCase())
  }

  
  return (
    <div>
      <Filter onChange={handleSearchTerm} />
      {countriesToShow.length > 10 ? 
          (
            <p>Too many matches, specify another filter</p>
          ) : countriesToShow.length <= 10 && countriesToShow.length >= 2 ? 
          ( 
            <div>
              {countriesToShow.map(country => 
                <CountryElement
                    key={country.name.common}
                    name={country.name.common}
                    handleClick={() => handleClick(country.name.common)}
                />
              )}
          </div>
          ) : <CountryData country={countriesToShow[0]} />
      }

    </div>
  )
}

export default App
