const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))
  })

usersRouter.post('/', async (request, response) => {
  const body = request.body
  let users = await User.find({})
  users = users.map(u => u.toJSON())

  if (body.username === undefined || body.password === undefined) {
    return response.status(400).json({ error: 'username or password missing' })
  } else if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters' })
  } else if (users.find(user => user.username === body.username)) {
    return response.status(400).json({ error: 'username must be unique' })    
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter