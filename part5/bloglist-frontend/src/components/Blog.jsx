import { useState } from 'react'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const showElement = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    setVisible(!visible)
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleClick}>{visible ? 'hide' : 'show'}</button>
        <div style={showElement}>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div>{blog.user.username}</div>
        </div>
    </div>
  )
}

export default Blog