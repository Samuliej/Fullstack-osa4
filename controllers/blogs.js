const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.status(200).json(blogs)
      })
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body)
    const blog = new Blog(body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = blogsRouter