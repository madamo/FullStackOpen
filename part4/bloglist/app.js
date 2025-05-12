const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB')
  })

//TO-DO: static dist
app.use(express.json())
//TO-DO: middleware request logger


app.use('/api/blogs', blogsRouter)

//TO-DO: middleware unknown endpoint and error handler

module.exports = app

