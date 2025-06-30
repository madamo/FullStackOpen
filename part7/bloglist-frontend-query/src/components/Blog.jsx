import { useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBlog, removeBlog } from '../requests'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'
import { useParams } from 'react-router-dom'
import { getBlogs, addComment } from '../requests'
import styled from 'styled-components'

const Entry = styled.div`
    border: 1px solid green;
    margin: 5px 0;
    width: 100%;
`


const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  const [commentVal, setCommentVal] = useState('')

  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const user = useContext(UserContext)

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

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'SET_MESSAGE', payload: { message: 'comment added!', isError: false }})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE' })
      }, 5000)
    }
  })

  const showElement = { display: visible ? '' : 'none' }
  
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

  const onChange = (event) => {
    setCommentVal(event.target.value)
  }

  const handleAddComment = (id) => {
    console.log(commentVal)
    const commentObject = {
      "comment": commentVal
    }
    addCommentMutation.mutate({id, commentObject})
    setCommentVal('')
  }

  const id = useParams().id

  const result = useQuery({
      queryKey: ['blogs'],
      placeholderData: [],
      queryFn: getBlogs,
      retry: false
    })
    //console.log(JSON.parse(JSON.stringify(result)))
    const blogs = result.data

    const blogById = blogs.find(blog => blog.id === id)

    if (!blogById) {
      return null
    }

  
  return (
    <Entry>
      <h2>{blogById.title} {blogById.author}</h2>
          <div><a href={`${blogById.url}`}>{blogById.url}</a></div>
          <div>likes {blogById.likes}
            <button onClick={addLike}>like</button>
          </div>
          <div>Added by {blogById.user.name}</div>

        {user.username === blogById.user.username && <button onClick={handleRemoveBlog}>remove</button> }
      <h3>comments</h3>
      <div>
        <input onChange={onChange} value={commentVal} />
        <button onClick={() => handleAddComment(blogById.id)}>add comment</button>
      </div>

      {blogById.comments 
        ? blogById.comments.map(comment => 
          <li key={comment}>{comment}</li>
          ) 
        : <p>no comments</p>
      }
    </Entry>
  )
}

export default Blog