
const AddPersonForm = (props) => {
    return (
        <form>
            <div>
            name: 
            <input
                value={props.nameValue}
                onChange={props.onNameChange}
            />
            </div>
            <div>
            number: 
            <input
                value={props.numValue}
                onChange={props.onNumChange}
            />
            </div>
            <div>
            <button type="submit" onClick={props.onClick}>add</button>
            </div>
        </form>
    )
}

export default AddPersonForm
