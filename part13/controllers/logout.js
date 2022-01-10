const router = require('express').Router()
const Session = require('../models/session')
const User = require('../models/user')
const { tokenExtractor } = require('../utils/tokenExtractor')

router.delete('/', tokenExtractor, async (req, res) => {
  try {
    const session = await Session.findOne({
      where: { 
        user_id: req.decodedToken.id
      }
    })

    const user = await User.findOne({ 
      where: { 
        id: req.decodedToken.id
      }
    })

    if (session) {
      await session.destroy()

      // disabling user
      user.disabled = true
      await user.save()
    }
    res.status(204).end()
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router