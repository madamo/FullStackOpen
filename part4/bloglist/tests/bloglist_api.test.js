const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
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

describe('deleting a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert(!blogsAtEnd.find(( {title, author, url, likes }) => {
      return title === blogToDelete.title && 
        author === blogToDelete.author &&
        url === blogToDelete.url &&
        likes === blogToDelete.likes
    }))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    
  })
})

describe('updating a blog', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const reqBody = {
      "likes": 505
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(reqBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    assert.strictEqual(updatedBlog.likes, reqBody.likes)
  })
})

describe('creating a user', () => {
  test('a valid user can be created', async () => {
    const newUser = {
      "username": "automatedtest",
      "name": "Automated Test",
      "password": "validpassword"
    }

    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('a missing password returns status 400 and error message', async () => {
    const newUser = {
      "username": "automatedtest",
      "name": "Automated Test",
    }

    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('password must be at least 3 characters', async () => {
    const newUser = {
      "username": "automatedtest",
      "name": "Automated Test",
      "password": "12"
    }

    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('a missing username returns 400 and error message', async () => {
    const newUser =  {
      "username": "root",
      "name": "Superuser",
      "password": "password123"
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})

