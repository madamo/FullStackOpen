const blogsRouter = require('express').Router()
const { nonExistingId } = require('../../../part4examples/tests/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // temp user
  const users = await User.find({})

  if (!body.title) {
    return response.status(400).json({ error: 'title missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'url missing'})
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: users[0]
  })

  try {
    const savedBlog = await blog.save()
    users[0].blogs = users[0].blogs.concat(savedBlog._id)
    await users[0].save()
    
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const likes = request.body.likes
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      console.log('blog not found')
      return response.status(404).end()
    }

    blog.likes = likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter