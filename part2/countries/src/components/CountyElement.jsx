const CountryElement = ({ name, handleClick }) => {

    return (
        <div>
            {name}
            <button onClick={handleClick}>Show</button>
        </div>
    )
}

export default CountryElement