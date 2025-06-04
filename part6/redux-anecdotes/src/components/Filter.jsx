import { useDispatch, useSelector } from "react-redux"
import { filterChange } from "../reducers/filterReducer"
import { useEffect } from 'react'

const Filter = () => {
  const dispatch = useDispatch()

  // Force initial rendering - not sure if this is hacky or actually needed
  useEffect(() => {
    dispatch(filterChange(''))
  }, [])

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input 
      onChange={handleChange} />
    </div>
  )
}

export default Filter