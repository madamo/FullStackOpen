import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {

  const [visible, setVisible] = useState(false)
  //const [likes, setLikes] = useState(blog.likes)

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

  const addLike = (event) => {
    event.preventDefault()
    const blogObject = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }
    console.log(blog.likes + 1)
    handleLike(blog.id, blogObject)
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleClick}>{visible ? 'hide' : 'show'}</button>
        <div style={showElement}>
          <div><a href={`${blog.url}`}>{blog.url}</a></div>
          <div>likes {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
    </div>
  )
}

export default Blog