const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.user)

  console.log(body)
  let blog = new Blog()
  if (!body.title || !body.url) {
    response.status(400).json({error: 'Title or Url field missing.'})
    return;
  }

  if (!body.likes) {
    blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user._id
    })
  } else {
      blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter