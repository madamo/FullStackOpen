const Person = (props) => {
    return (
         
          <li>
            {props.name} {props.number}
            <button onClick={props.removePerson}>delete</button>
          </li>

    )
}

export default Person