import { useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBlog, removeBlog } from '../requests'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'
import { useParams } from 'react-router-dom'
import { getBlogs, addComment } from '../requests'
import styled from 'styled-components'

const Entry = styled.div`
    border: 2px solid #FF13F0;
    margin: 5px 0;
    padding: 0px 5px;
    width: 100%;

    li {
      list-style: none;
      background-color: lightgrey;
      margin: 5px 0;
      padding: 5px 2px;
      width: 50%;
      border-radius: 5px;
    }
`

const BlogUrl = styled.div`
  margin: 5px 0;
`

const BlogLikes = styled.div`
  margin: 5px 0;

  button {
    margin-left: 15px;
  }
`

const BlogAuthor = styled.div`
  margin: 5px 0;
`

const AddCommentField = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;

  input {
    width: 75%;
    padding: 5px 0;
  }
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
    updateLikesMutation.mutate({ ...blogById, likes: blogById.likes + 1})
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
    //console.log(blogById)
    if (!blogById) {
      return null
    }

  
  return (
    <Entry>
      <h2>{blogById.title} {blogById.author}</h2>
          <BlogUrl><a href={`${blogById.url}`}>{blogById.url}</a></BlogUrl>
          <BlogLikes>{blogById.likes} likes
            <button onClick={addLike}>like</button>
          </BlogLikes>
          <BlogAuthor>Added by {blogById.user.name}</BlogAuthor>

        {user.username === blogById.user.username && <button onClick={handleRemoveBlog}>remove</button> }
      <h3>comments</h3>
      <AddCommentField>
        <input onChange={onChange} value={commentVal} />
        <button onClick={() => handleAddComment(blogById.id)}>add comment</button>
      </AddCommentField>

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