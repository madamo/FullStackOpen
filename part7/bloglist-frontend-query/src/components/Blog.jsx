import { useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBlog, removeBlog } from '../requests'
import NotificationContext from '../NotificationContext'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {

  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)


  const updateLikesMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'SET_MESSAGE', payload: { message: `${data.title} liked!`, isError: false }})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE' })
      }, 5000)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'SET_MESSAGE', payload: { message: `blog removed!`, isError: false }})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE' })
      }, 5000)
    }
  })

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
    //console.log(loggedInUser)
  }

  const addLike = (event) => {
    event.preventDefault()
    /*const blogObject = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }*/
    console.log(blog.likes + 1)
    //handleLike(blog.id, blogObject)
    updateLikesMutation.mutate({ ...blog, likes: blog.likes + 1})
  }

  const handleRemoveBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      //handleRemove(blog.id)
      removeBlogMutation.mutate(blog.id)
    }
  }
  
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={handleClick}>{visible ? 'hide' : 'show'}</button>
        <div style={showElement} className="blog-details">
          <div><a href={`${blog.url}`}>{blog.url}</a></div>
          <div>likes {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>

        {loggedInUser === blog.user.username && <button onClick={handleRemoveBlog}>remove</button> }
        
    </div>
  )
}

export default Blog