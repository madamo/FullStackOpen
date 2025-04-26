
const Filter = (props) => {
    return (
        <div>
            <label>filter shown with </label>
            <input  
                onChange={props.onChange}
            />
        </div>
    )
}

export default Filter
