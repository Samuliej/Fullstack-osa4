const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  
  test('there are two blogs currently', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })
  
  test('objects have an field named "id"', async () => {
      const response = await api.get('/api/blogs')
      const blogArr = response.body
      blogArr.forEach(blog => { 
        expect(blog.id).toBeDefined()
      })
  })
  
})

describe('adding a blog', () => {
  test('a valid blog can be added ', async () => {

    const newBlog = {
      "title": "TestiBlogi testien kautta",
      "author": "Samppa",
      "url": "https://www.eioleolemassa.fi",
      "likes": 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(title).toContain('TestiBlogi testien kautta')
  })
  
  test('if an blog object is made without an likes field, it is set to zero', async () => {
    const newBlog = {
      "title": "TestiBlogi ilman likes kenttää",
      "author": "Samppa",
      "url": "https://www.eiolevielakaanolemassa.fi"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const addedBlog = response.body[response.body.length-1]
    expect(addedBlog.likes).toBe(0)
  })
  
  test('if blog is missing the title or the url field, server responds 400 Bad Request', async () => {
    let newBlog = {
      "author": "Samppa",
      "url": "https://www.eiolevielakaanolemassa.fi"
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
    newBlog = {
      "author": "Samppa",
      "title": "Testi"
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  }) 
})

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogsAtStart)
    console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})


describe('updating a blog', () => {
  test('succeeds with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const originalBlogTitle = blogToModify.title
    console.log(blogToModify)
    
    const blog = {
      "title": "muokattu blogi testien kautta",
      "author": "Samppa",
      "url": "https://www.eiolfdsaeolemassa.fi",
      "likes": 66
    }

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(originalBlogTitle)
  })
})

  
afterAll(() => {
  mongoose.connection.close()
})