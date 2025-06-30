import styled from 'styled-components'

const Banner = styled.div`
  width: 100%;
  position: absolute;
  top: 50px;
`

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
      <Banner style={style}>
          {notification.message}
      </Banner>
  )
}

export default Notification