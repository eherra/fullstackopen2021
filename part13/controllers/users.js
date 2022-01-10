const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
	const users = await User.findAll({ 
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
	res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    include: {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: ['id', 'read'],
          where
        },
      },
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body)
		return res.json(user)
	} catch(error) {
		next(error)
	}
})

router.put('/:username', async (req, res, next) => {
	try {
		const user = await User.findOne({ 
      where: { 
        username: req.params.username 
      }
    })
		user.name = req.body.name
		await user.save()
		res.json(user)
	} catch(error) {
		next(error)
	}
})

module.exports = router