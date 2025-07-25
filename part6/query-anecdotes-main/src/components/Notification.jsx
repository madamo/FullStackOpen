const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!message) return null

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
