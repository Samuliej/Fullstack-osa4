const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middelware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middelware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middelware.unknownEndpoint)
app.use(middelware.errorHandler)

module.exports = app