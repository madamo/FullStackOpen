const Country = ({ country }) => {
    console.log('rendering Country')
    if (country === null) {
        return null
    }

    console.log(country.languages)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).forEach(language => {
                    <li>{language}</li>
                })}
            </ul>
            <img src={country.flags.png} />

        </div>
    )
}

export default Country