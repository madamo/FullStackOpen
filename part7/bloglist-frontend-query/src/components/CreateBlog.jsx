import { useState, useContext } from 'react'
import { useMutation, useQueryClient }  from '@tanstack/react-query'
import NotificationContext from '../NotificationContext'
import { createBlog } from '../requests'

import PropTypes from  'prop-types'

const CreateBlog = ({ handleCreate }) => {

  //const [newBlog, setNewBlog] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs' ]})
      // TO-DO: notfications
      notificationDispatch({ type: 'SET_MESSAGE', payload: {message: `anecdote ${data.title} created`, isError: false}})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE'})
      }, 5000)
    },
    onError: (error) => {
      console.log(error.response.status)
      if (error.response.status === 400) {
        notificationDispatch({ type: 'SET_MESSAGE', payload: {message: `error creating anecdote`, isError: true}})
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_MESSAGE'})
        }, 5000)
      }
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    // Call createBlog
    //handleCreate(blogObject)
    newBlogMutation.mutate(blogObject)
    
    // reset blog form
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog:</h2>
      <div>title:
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            placeholder="title"
            data-testid="title"
            onChange={({ target }) => setBlogTitle(target.value)} />
            
      </div>

      <div>author:
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            placeholder="author"
            data-testid="author"
            onChange={({ target}) => setBlogAuthor(target.value)} />
      </div>

      <div>url:
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            placeholder="url"
            data-testid="url"
            onChange={({ target }) => setBlogUrl(target.value)} />
      </div>
    <button type="submit">Create</button>
    </form>
  )
}

CreateBlog.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default CreateBlog