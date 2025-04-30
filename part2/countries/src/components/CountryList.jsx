const CountryList = ({ countriesToShow }) => {
    
    // If more than 10 matches, prompt user to refine search
    if (countriesToShow.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    // If number of matches is between 2 and 10, show the list of matches
    } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
        return (
            <ul>
                {countriesToShow.map(country => 
                    <li key={country.cca2}>{country.name.common}</li>
                )}
          </ul>
        )
    // If there is only 1 match, show the info for that country
    } else if (countriesToShow.length === 1) {
        return (
            <div>
                <h1>{countriesToShow[0].name.common}</h1>
                <p>Capital {countriesToShow[0].capital}</p>
                <p>Area {countriesToShow[0].area}</p>

                <h2>Languages</h2>
                <ul>
                    {Object.values(countriesToShow[0].languages).map(language => 
                        <li key={language}>{language}</li>
                    )}
                </ul>
                <img src={countriesToShow[0].flags.png} />

            </div>
        )
    // If there are no countries to show, don't show anything
    } else {
        return null
    }
}

export default CountryList