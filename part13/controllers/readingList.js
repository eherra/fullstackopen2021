const router = require('express').Router()
const { UserReadingList, User } = require('../models')
const { tokenExtractor } = require('../utils/tokenExtractor')

router.post('/', async (req, res) => {
  try {
    const connection = await UserReadingList.create(req.body)
    res.json(connection)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (user.disabled) {
    return res.status(401).json({
      error: 'session expired, please login again'
    })
  }

  const readingListValue = await UserReadingList.findByPk(req.params.id)
  if (isAuthorizedForModifications(user, readingListValue)) {
    readingListValue.read = req.body.read
    await readingListValue.save()
    res.json(readingListValue)
  } else {
    res.status(404).end()
  }
})

const isAuthorizedForModifications = (user, readingListValue) => {
  return user && readingListValue && (user.id === readingListValue.user_id)
}

module.exports = router