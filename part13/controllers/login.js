const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })
  
  const passwordCorrect = body.password === 'secret'
  if (!(user && passwordCorrect)) {
      return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  // finding if user has session alive
  const session = await Session.findOne({
    where: { 
      user_id: user.id 
    }
  })

  let token

  // if session not alive, creating one and adding session to DB
  if (!session) {
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    token = jwt.sign(userForToken, SECRET)

    await Session.create({
      user_id: user.id, 
      token: token
    })
  } else {
    token = session.token
  }

  // enable user to use app's functions
  user.disabled = false
  await user.save()

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router