import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'


const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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

    dispatch(addLike(user, blogObject))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(user, blog))
      dispatch(setNotification(`${blog.title} removed`, false, 5))
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
        
        {user.username === blog.user.username && <button onClick={removeBlog}>remove</button> }

    </div>
  )
}

export default Blog