import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  console.log(response.data)
  return response.data
}

const createBlog = async (blogObject) => {
  console.log(token)
  console.log(typeof(blogObject))
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const updateBlog = async (blogObject) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }

  console.log('blog to update', blogObject)

  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  return response.data
}

const removeBlog = async (blog) => {
    const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { 
  getAll,
  setToken,
  createBlog,
  updateBlog,
  removeBlog
}