const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const User = require('../models/user')
const api = supertest(app)

describe('adding user doesnt work when invalid information given', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('root', 10)
        const user = new User({ username: 'takenUsername', passwordHash })
    
        await user.save()
    })
  
    test('adding user fails when username taken added with correct error message and status code', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'takenUsername',
        name: 'newUser',
        password: 'qwerty',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('username must be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('adding user fails when username taken added with correct error message and status code', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'takenUsername',
          name: 'newUser',
          password: 'qwerty',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('adding user fails when username not given with correct error message and status code', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          name: 'newUser',
          password: 'qwerty',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username or password missing')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('adding user fails when password not given with correct error message and status code', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: "userName",  
          name: 'newUser',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username or password missing')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('adding user fails when password too short with correct error message and status code', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: "username",
          name: 'newUser',
          password: 'sh'
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('password must be at least 3 characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
  })