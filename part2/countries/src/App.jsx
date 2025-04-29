import { useState, useEffect } from 'react'
import countryService from './services/countries'


function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getAll()
      .then(countryList => {
        console.log(countryList)
        setCountries(countryList)
      })
  }, [])

  return (
    <div>
      <ul>
        {countries.map(country => 
          <li key={country.cca2}>{country.name.common}</li>
        )}
      </ul>
    </div>
  )
}

export default App
