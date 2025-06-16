const Notification = ({ notification }) => {
  //const { message, isError } = notification

  if (!notification) {
    return null
  }

  const style = {
    color: notification.isError ? 'red' : 'green',
    //color: 'purple',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
      <div style={style}>
          {notification.message}
      </div>
  )
}

export default Notification