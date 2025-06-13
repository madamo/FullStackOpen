import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ message }) => message.content)
  const isError = useSelector(({ message }) => message.isError)
  //console.log('notification:', notification)
  //console.log('isError:', isError)

  if (!notification) {
    return null
  }

  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
      <div style={style}>
          {notification}
      </div>
  )
}

export default Notification