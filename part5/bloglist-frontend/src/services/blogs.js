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

const updateBlog = async (id, blogObject) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return response.data
}

const removeBlog = async (id) => {
    const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { 
  getAll,
  setToken,
  createBlog,
  updateBlog,
  removeBlog
}