import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike } from '../reducers/blogReducer'

const Blog = ({ blog, handleLike }) => {

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
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

  const updateLikes = (event) => {
    event.preventDefault()
    const blogObject = {
      id: blog.id,
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes
    }

    //dispatch(addLike())

    //console.log(blog.likes + 1)
    handleLike(blog.id, blogObject)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }
  
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={handleClick}>{visible ? 'hide' : 'show'}</button>
        <div style={showElement} className="blog-details">
          <div><a href={`${blog.url}`}>{blog.url}</a></div>
          <div>likes {blog.likes}
            <button onClick={updateLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
        
    </div>
  )
}

export default Blog