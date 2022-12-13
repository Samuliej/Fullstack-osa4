const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)

app.use('/api/blogs', notesRouter)
app.use(cors())
app.use(express.json())

module.exports = app