import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  //console.log('setting token', newToken)
  token = `Bearer ${newToken}`
}

/*const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  console.log(response.data)
  return response.data
}*/

export const getBlogs = async () => {
  const config = {
    headers: { Authorization: token }
  }
  //console.log(`getting blogs with token ${token}...`)
  const result = await axios.get(baseUrl, config)
  return result.data
}

export const createBlog = async (blogObject) => {
  //console.log(token)
  //console.log(typeof(blogObject))
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

export const updateBlog = async (blogObject) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }

  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  return response.data
}

export const removeBlog = async (id) => {
    const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token 
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}