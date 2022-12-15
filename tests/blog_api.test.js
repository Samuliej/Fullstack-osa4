const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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
  
afterAll(() => {
  mongoose.connection.close()
})