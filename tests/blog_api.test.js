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
  console.log(response)
  console.log(response.body)
  expect(response.body).toHaveLength(2)
})
  
afterAll(() => {
  mongoose.connection.close()
})