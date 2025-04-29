const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    if (messageType === 'success') {
        return (
        <div className='message success'>
            {message}
        </div>
        )
    }

    if (messageType === 'error') {
        return (
        <div className='message error'>
            {message}
        </div>
        )
    }
}

export default Notification