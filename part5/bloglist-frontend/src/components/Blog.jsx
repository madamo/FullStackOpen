import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {

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
    console.log(loggedInUser)
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

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }
  
  return (
    <div style={blogStyle} className="title-author">
      {blog.title} {blog.author}
      <button onClick={handleClick}>{visible ? 'hide' : 'show'}</button>
        <div style={showElement} className="blog-details">
          <div><a href={`${blog.url}`}>{blog.url}</a></div>
          <div>likes {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>

        {loggedInUser === blog.user.username && <button onClick={removeBlog}>remove</button> }
        
    </div>
  )
}

export default Blog