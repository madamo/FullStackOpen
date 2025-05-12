const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const app = express()

const password = process.argv[2]
console.log(password)

const mongoUrl = `mongodb+srv://mattadamoux:${password}@cluster0.u3sqg.mongodb.net/bloglistApp?retryWrites=true&w=majority&appName=Cluster0`

//const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})