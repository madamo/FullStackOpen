const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

//const password = process.argv[2]
//console.log(password)

//const mongoUrl = `mongodb+srv://mattadamoux:${password}@cluster0.u3sqg.mongodb.net/bloglistApp?retryWrites=true&w=majority&appName=Cluster0`

//const mongoUrl = 'mongodb://localhost/bloglist'
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error('error connecting to MongoDB')
  })

//TO-DO: static dist
app.use(express.json())
//TO-DO: middleware request logger


app.use('/api/blogs', blogsRouter)

//TO-DO: middleware unknown endpoint and error handler

module.exports = app

