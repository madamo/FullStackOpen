import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './messageReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload).sort((a,b) => b.likes - a.likes)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (user, content) => {
  const blogToAdd = JSON.stringify(content)

  return async dispatch => {
    try {
      blogService.setToken(user.token)
      const newBlog = await blogService.createBlog(blogToAdd)
      dispatch(appendBlog(newBlog))
    } catch (error) {
      console.error(error)
      dispatch(setNotification(`${error}`, true, 5))
    }
  }
}

export const addLike = (user, blog) => {
  return async dispatch => {
    console.log(blog)
    const changedBlog = {
      ...blog, likes: blog.likes + 1
    }

    console.log(changedBlog)
    
    blogService.setToken(user.token)
    
    const updatedBlog = await blogService.updateBlog(changedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

/*
const handleCreate = async (blogObject) => {
   const convertedBlog = JSON.stringify(blogObject)
    console.log(blogObject)
    try {
      blogService.setToken(user.token)
      const createdBlog = await blogService.createBlog(convertedBlog)
      console.log(createdBlog)
      setBlogs(blogs.concat(createdBlog))
      dispatch(setNotification(`${blogObject.title} by ${blogObject.author} added!`, false, 5))
      createBlogRef.current.toggleVisibility()
    } catch (error) {
      console.error(error)
      dispatch(setNotification(`${error}`, true, 5))
    }
  }
*/

export default blogSlice.reducer