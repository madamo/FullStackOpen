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
    },
    removeBlog(state, action) {
      const blogToRemove = state.findIndex((blog) => action.payload.id === blog.id)
      console.log('removing blog', blogToRemove)
      return state.toSpliced(blogToRemove, 1)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

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
    const changedBlog = {
      ...blog, likes: blog.likes + 1
    }
    
    blogService.setToken(user.token)
    const updatedBlog = await blogService.updateBlog(changedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (user, blog) => {
  return async dispatch => {
    blogService.setToken(user.token)
    const removedBlog = await blogService.removeBlog(blog)
    console.log(removedBlog)
    dispatch(removeBlog(blog))
  }
}

export default blogSlice.reducer