const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Eka blogi",
    author: "Testaaja",
    url: "ei ole",
    likes: 2
  },
  {
    title: "Toka blogi",
    author: "Testaaja2",
    url: "ei olee",
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Kolmas blogi",
    author: "Testaaja3",
    url: "juu",
    likes: 2
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}