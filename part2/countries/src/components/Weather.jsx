const Weather = ({ city, icon, condition, temp }) => {
    if (!city) {
        return null
    }

    return (
        <div>
            <h2>Weather in {city}</h2>
            <div><img src={icon} /></div>
            <div>{condition}</div>
            <div>{temp}</div>
        </div>
    )
}

export default Weather