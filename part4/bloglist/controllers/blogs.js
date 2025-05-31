const blogsRouter = require('express').Router()
const { nonExistingId } = require('../../../part4examples/tests/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
  const user = request.user

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
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    await savedBlog.populate('user', { username: 1, name: 1, id: 1 })

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  // get the user submitting the request
  const requestUser = request.user

  if (!requestUser) {
    return response.status(400).json({ error: 'userID missing or invalid' })
  }

  // get the user who created the blog
  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(400).json({ error: 'blog not found' })
  }

  // if they don't match, return 401 not authorized
  if (blogToDelete.user.toString() !== requestUser.id.toString()) {
    return response.status(401).json({ error: 'not authorized to delete' })
  } else {
    try {
      await Blog.deleteOne(blogToDelete)
      response.status(204).end()
    } catch (exception) {
     next(exception)
    }
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
    await updatedBlog.populate('user', { username: 1, name: 1, id: 1 })

    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter