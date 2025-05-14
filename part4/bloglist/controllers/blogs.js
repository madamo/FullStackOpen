const blogsRouter = require('express').Router()
const { nonExistingId } = require('../../../part4examples/tests/test_helper')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({ error: 'title missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'url missing'})
  }
  
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }

})

module.exports = blogsRouter