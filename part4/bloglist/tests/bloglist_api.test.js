const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have property id, not _id', async () => {
  const blogs = await helper.blogsInDb()

  assert(Object.hasOwn(blogs[0], 'id'))
})

test('a valid blog post can be added', async () => {
  const newBlog = {
      title: "My Test Blog",
      author: "Test Author",
      url: "http://localhost:3001/test.html",
      likes: 12,
  }

  const newBlogValues = Object.values(newBlog)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  assert(blogsAtEnd.find(( {title, author, url, likes }) => {
   return title === newBlog.title && 
    author === newBlog.author &&
    url === newBlog.url &&
    likes === newBlog.likes
  }))
  /*
  // Check if the new list of blogs contains an object with the title, author, url, likes of the test case
  const result = blogsAtEnd.find(( {title, author, url, likes }) => {
   return title === newBlog.title && 
    author === newBlog.author &&
    url === newBlog.url &&
    likes === newBlog.likes
  })

  // Get the values of each property in the returned match
  const contents = Object.values(result)

  // Remove the ID
  const removed = contents.splice(contents.length-1, 1)
  
  // Test if the values in the returned object match values in test object 
  assert(contents.every(val => newBlogValues.includes(val)))

*/

})

test('number of likes will default to 0 if it is missing from request', async () => {
  const newBlog = {
    title: "My Test Blog",
    author: "Test Author",
    url: "http://localhost:3001/test.html",
  }
    
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[6].likes, 0)

})

test('new blogs must have a title', async () => {
  const blogWithNoTitle = {
    author: "Test Author",
    url: "http://localhost:3001/test.html",
  }

  await api
    .post('/api/blogs')
    .send(blogWithNoTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('new blogs must have a url', async () => {
  const blogWithNoUrl = {
    title: "My Test Blog",
    author: "Test Author",
  }

  await api
    .post('/api/blogs')
    .send(blogWithNoUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

